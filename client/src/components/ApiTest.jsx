import { useEffect, useState } from 'react';

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const apiKey = 'sAhXfNPP7Dsqx1w9AFN1cjEu9BEDeqNK'; 
    const apiUrl = `https://app.ticketmaster.com/discovery/v2/events.json?keyword=lukecombs&segmentName=Music&apikey=${apiKey}`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Did not work');
        }
        return response.json();
      })
      .then((data) => {
        // setEvents(data._embedded.events);
        console.log('data =', JSON.stringify(data,null,2))
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  }, []);

  return (
    <div className="event-list">
      <h1>Ticketmaster Events</h1>
      <ul>
        {/* {events.map((event) => (
          <li key={event.id}>
            <strong>{event.name}</strong>
            <p>Date: {event.dates.start.localDate}</p> 
            <p>Location: {event._embedded.venues[0].name}</p> {location}
            
          </li>
        ))} */}
      </ul>
    </div>
  );
}

export default App;
