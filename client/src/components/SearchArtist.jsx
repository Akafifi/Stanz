import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
//use useMutation hook
import { useMutation } from '@apollo/client'
import {ADD_EVENT} from '../utils/mutations'
function SearchArtist() {
  const [events, setEvents] = useState([])
  const [search, setSearch] = useState('')

  const [saveEvent, {error}] = useMutation(ADD_EVENT)

  const mapTicketMasterEventsToStanzEvents = (ticketmasterEvents = []) => {
    return ticketmasterEvents.map((event) => {
      const venue = event._embedded.venues[0]
      // console.log(venue)
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

  function handleSearch() {
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
      .then((data) => {
        console.log(data)
        const mappedEvents = mapTicketMasterEventsToStanzEvents(
          data._embedded.events,
        )
        setEvents(mappedEvents)
        console.log(mappedEvents)
        console.log('data =', JSON.stringify(mappedEvents, null, 2))
      })
      .catch((error) => {
        console.error('Fetch error:', error)
      })
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
