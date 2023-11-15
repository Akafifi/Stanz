import { useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'
import { SAVE_TOUR } from '../utils/mutations'

function SearchArtist() {
  const [search, setSearch] = useState('')
  const [saveTour, {}] = useMutation(SAVE_TOUR)

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
      .then((data) => {
        const stops = mapTicketMasterEventsToStanzEvents(data._embedded.events)
        // console.log('data =', JSON.stringify(stops, null, 2))

        saveTour({
          variables: {
            tour: {
              artist: artistSearch,
              user: localStorage.getItem('id'),
              stops,
            },
          },
        })
      })
      .catch((error) => {
        console.error('Fetch error:', error)
      })
    return
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
      <div></div>
    </>
  )
}

export default SearchArtist
