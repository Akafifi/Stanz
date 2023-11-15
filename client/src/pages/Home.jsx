import { useQuery } from '@apollo/client'

//  import ProfileList from '../components/ProfileList'

import { QUERY_SINGLE_TOUR } from '../utils/queries'
import GoogleMapReact from 'google-map-react'
import MapPin from '../components/mapPin'
import SearchArtist from '../components/SearchArtist'

const Home = () => {
  // const { loading, data } = useQuery(QUERY_PROFILES)
  const { data } = useQuery(QUERY_SINGLE_TOUR, {
    variables: { _id },
  })
  const mapPinResults = tour()
  // const profiles = data?.profiles || []

  const defaultProps = {
    center: {
      lat: 44.5,
      lng: -89.5,
    },
    zoom: 3,
  }

  // var testArray = [
  //   {
  //     venue: 'State Farm Stadium',
  //     dateTime: '2024-06-02T00:45:00Z',
  //     city: 'Glendale',
  //     state: 'AZ',
  //     geoPoint: { lat: '33.5312', long: '-112.2202' },
  //   },
  //   {
  //     venue: 'State Farm Stadium',
  //     dateTime: '2024-06-01T00:45:00Z',
  //     city: 'Glendale',
  //     state: 'AZ',
  //     geoPoint: { lat: '33.5312', long: '-112.2202' },
  //   },
  //   {
  //     venue: 'NRG Stadium',
  //     dateTime: '2024-08-10T22:45:00Z',
  //     city: 'Houston',
  //     state: 'TX',
  //     geoPoint: { lat: '29.6835', long: '-95.400101' },
  //   },
  //   {
  //     venue: 'FedEx Field',
  //     dateTime: '2024-07-27T21:45:00Z',
  //     city: 'Landover',
  //     state: 'MD',
  //     geoPoint: { lat: '38.918301', long: '-76.872101' },
  //   },
  //   {
  //     venue: 'NRG Stadium',
  //     dateTime: '2024-08-09T22:45:00Z',
  //     city: 'Houston',
  //     state: 'TX',
  //     geoPoint: { lat: '29.6835', long: '-95.400101' },
  //   },
  //   {
  //     venue: 'FedEx Field',
  //     dateTime: '2024-07-26T21:45:00Z',
  //     city: 'Landover',
  //     state: 'MD',
  //     geoPoint: { lat: '38.918301', long: '-76.872101' },
  //   },
  //   {
  //     venue: 'FedEx Field',
  //     dateTime: undefined,
  //     city: 'Landover',
  //     state: 'MD',
  //     geoPoint: { lat: '38.918301', long: '-76.872101' },
  //   },
  // ]

  return (
    <main>
      <div style={{ height: '50vh', width: '50%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBoQHlU4edUPiQH1TPsRRc2bhtV8nhCAK8' }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          {testArray.map((stop) => {
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
    </main>
  )
}

export default Home
