import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { SAVE_TOUR } from '../utils/mutations'
import Map from './Map'
import { Card, Button, InputGroup, FormControl } from 'react-bootstrap'
import { ADD_EVENT } from '../utils/mutations'

function SearchArtist() {
  const [search, setSearch] = useState('')
  const [mapPinStops, setMapPinStops] = useState([])
  const [saveTour, {}] = useMutation(SAVE_TOUR)
  const [events, setEvents] = useState([])
  const [saveEvent, { error }] = useMutation(ADD_EVENT)
  const [errorMessage, setErrorMessage] = useState('')

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
    setErrorMessage('')
    setMapPinStops([])
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
        setErrorMessage('Tour data not available')
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
      <Map events={mapPinStops} />
      {errorMessage && <p className="text-danger fs-6 m-0"> {errorMessage} </p>}
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
