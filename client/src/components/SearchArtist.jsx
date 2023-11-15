import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { SAVE_TOUR } from '../utils/mutations'
import GoogleMapReact from 'google-map-react'
import MapPin from '../components/mapPin'
import { Card, Button, InputGroup, FormControl } from 'react-bootstrap'
import { ADD_EVENT } from '../utils/mutations'

function SearchArtist() {
  const [search, setSearch] = useState('')
  const [mapPinStops, setMapPinStops] = useState([])
  const [saveTour, {}] = useMutation(SAVE_TOUR)
  const [events, setEvents] = useState([])
  const [saveEvent, { error }] = useMutation(ADD_EVENT)

  const defaultProps = {
    center: {
      lat: 37.1,
      lng: -95.5,
    },
    zoom: 4,
  }

  const mapTicketMasterEventsToStanzEvents = (ticketmasterEvents = []) => {
    return ticketmasterEvents.map((event) => {
      const venue = event._embedded.venues[0]
      return {
        venue: venue.name,
        dateTime: event.dates.start.dateTime,
        city: venue.city.name,
        state: venue?.state?.stateCode,
        geoPoint: {
          lat: venue.location.latitude,
          long: venue.location.longitude,
        },
      }
    })
  }

  const handleSearch = () => {
    const artistSearch = search
    const apiKey = 'sAhXfNPP7Dsqx1w9AFN1cjEu9BEDeqNK'
    const apiUrl = `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${artistSearch}&segmentName=Music&apikey=${apiKey}`

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Did not work')
        }
        return response.json()
      })
      .then(async (data) => {
        const stops = mapTicketMasterEventsToStanzEvents(data._embedded.events)
        const tour = await saveTour({
          variables: {
            tour: {
              artist: artistSearch,
              user: localStorage.getItem('id'),
              stops,
            },
          },
        })
        setMapPinStops(tour.data.saveTour.stops)
      })
      .catch((error) => {
        console.error('Fetch error:', error)
      })
    return
  }

  function handleSaveEvent(e) {
    const i = e.target.value
    const eventInfo = events[i]
    saveEvent({
      variables: {
        dateTime: eventInfo.dateTime,
        city: eventInfo.city,
        venue: eventInfo.venue,
      },
    })
  }

  return (
    <div className="container d-flex flex-column align-items-center">
      <div
        style={{ height: '50vh', width: '50%' }}
        className="m-4 border border-2 shadow"
      >
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBoQHlU4edUPiQH1TPsRRc2bhtV8nhCAK8' }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          {mapPinStops.map((stop) => {
            return (
              <MapPin
                stop={stop}
                lat={stop.geoPoint.lat}
                lng={stop.geoPoint.long}
              />
            )
          })}
        </GoogleMapReact>
      </div>
      <div className="d-flex">
        <InputGroup>
          <FormControl
            className="col-10"
            placeholder="Search Artist"
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button className="bg-success" onClick={() => handleSearch()}>
            Search
          </Button>
        </InputGroup>
      </div>
      <div>
        {events.map((eventData, index) => {
          return (
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Card.Title>{eventData.city}</Card.Title>
                <Card.Text>{eventData.dateTime}</Card.Text>
                <Card.Text>{eventData.venue}</Card.Text>
                <Button
                  variant="primary"
                  onClick={handleSaveEvent}
                  value={index}
                >
                  Save
                </Button>
              </Card.Body>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default SearchArtist
