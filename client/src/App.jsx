import './App.css'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { Outlet } from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'
// import MapboxMap from './components/MapboxMap'; // Import your MapboxMap component

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
})

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token')
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

const App = () => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://app.ticketmaster.com/discovery/v2/events.json?keyword=lukecombs&segmentName=Music&apikey=YOUR_TICKETMASTER_API_KEY',
        )
        const data = await response.json()
        setEvents(data._embedded.events)
      } catch (error) {
        console.error('Ticketmaster API error:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <ApolloProvider client={client}>
      <div className="flex-column justify-flex-start min-100-vh">
        <Header />
        <div className="container">
          <ul>
            {events.map(async (event) => {
              const location = event._embedded.venues[0].name
              const { longitude, latitude } = await getGeolocation(location)

              return (
                <li key={event.id}>
                  <strong>{event.name}</strong>
                  <p>Date: {event.dates.start.localDate}</p>
                  <p>Location: {location}</p>
                  {longitude && latitude && (
                    <MapboxMap longitude={longitude} latitude={latitude} />
                  )}
                </li>
              )
            })}
          </ul>
        </div>
        <Footer />
      </div>
    </ApolloProvider>
  )
}

export default App
