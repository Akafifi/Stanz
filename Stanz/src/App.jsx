import React, { useEffect, useState } from 'react';

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Replace 'YOUR_API_KEY' with your actual Ticketmaster API key
    const apiKey = 'sAhXfNPP7Dsqx1w9AFN1cjEu9BEDeqNK'; // Use your Ticketmaster Consumer Key
    const apiUrl = `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey=${apiKey}`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setEvents(data._embedded.events);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  }, []);

  return (
    <div className="event-list">
      <h1>Ticketmaster Events</h1>
      <ul>
        {events.map((event) => (
          <li key={event.id}>{event.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
