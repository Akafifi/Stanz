import { useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'

import { SAVE_TOUR } from '../utils/mutations'
import { map } from 'rxjs'
import GoogleMapReact from 'google-map-react'
import MapPin from '../components/mapPin'


import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
//use useMutation hook
import { useMutation } from '@apollo/client'
import {ADD_EVENT} from '../utils/mutations'

function SearchArtist() {
  const [search, setSearch] = useState('')
  const [mapPinStops, setMapPinStops] = useState([])
  const [saveTour, {}] = useMutation(SAVE_TOUR)
  // let mapPinStops = []

  const defaultProps = {
    center: {
      lat: 44.5,
      lng: -89.5,
    },
    zoom: 3,
  }

  const [saveEvent, {error}] = useMutation(ADD_EVENT)

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
        // console.log('data =', JSON.stringify(stops, null, 2))

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
        console.log('mappins', mapPinStops)
        console.log('tour', tour)
      })
      .catch((error) => {
        console.error('Fetch error:', error)
      })
    return
  }


  function handleSaveEvent(e) {
    const i = e.target.value
    const eventInfo = events[i];
    saveEvent({
      variables: {
        dateTime: eventInfo.dateTime,
        city: eventInfo.city,
        venue: eventInfo.venue
      }
    })
  }


  return (
    <>
      <div style={{ height: '50vh', width: '50%' }}>
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
      <div className="container">
        <input
          placeholder="Search Artist"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={() => handleSearch()}>Search</button>
      </div>
      <div>
        {
          events.map((eventData, index) => {
            return (
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                  <Card.Title>{eventData.city}</Card.Title>
                  <Card.Text>
                    {eventData.dateTime}
                  </Card.Text>
                  <Card.Text>
                    {eventData.venue}
                  </Card.Text>
                  <Button variant="primary" onClick={handleSaveEvent} value={index}>Save</Button>
                </Card.Body>
              </Card>
            );
          }
          )
        }
      </div>
      )
    </>
  )
}

export default SearchArtist
