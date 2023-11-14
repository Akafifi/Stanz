import { useQuery } from '@apollo/client';

import ProfileList from '../components/ProfileList';

import { QUERY_PROFILES } from '../utils/queries';
import GoogleMapReact from 'google-map-react';
import MapPin from '../components/mapPin'; 

const Home = () => {
  const { loading, data } = useQuery(QUERY_PROFILES);
  const profiles = data?.profiles || [];

  const defaultProps = {
    center: {
      lat: 44.500000,
      lng: -89.500000,
    },
    zoom: 11
  };
  var testArray=
  [
    {
      venue: 'State Farm Stadium',
      dateTime: '2024-06-02T00:45:00Z',
      city: 'Glendale',
      state: 'AZ',
      geoPoint: { lat: '33.5312', long: '-112.2202' }
    },
    {
      venue: 'State Farm Stadium',
      dateTime: '2024-06-01T00:45:00Z',
      city: 'Glendale',
      state: 'AZ',
      geoPoint: { lat: '33.5312', long: '-112.2202' }
    },
    {
      venue: 'NRG Stadium',
      dateTime: '2024-08-10T22:45:00Z',
      city: 'Houston',
      state: 'TX',
      geoPoint: { lat: '29.6835', long: '-95.400101' }
    },
    {
      venue: 'FedEx Field',
      dateTime: '2024-07-27T21:45:00Z',
      city: 'Landover',
      state: 'MD',
      geoPoint: { lat: '38.918301', long: '-76.872101' }
    },
    {
      venue: 'NRG Stadium',
      dateTime: '2024-08-09T22:45:00Z',
      city: 'Houston',
      state: 'TX',
      geoPoint: { lat: '29.6835', long: '-95.400101' }
    },
    {
      venue: 'FedEx Field',
      dateTime: '2024-07-26T21:45:00Z',
      city: 'Landover',
      state: 'MD',
      geoPoint: { lat: '38.918301', long: '-76.872101' }
    },
    {
      venue: 'FedEx Field',
      dateTime: undefined,
      city: 'Landover',
      state: 'MD',
      geoPoint: { lat: '38.918301', long: '-76.872101' }
    }
  ]



  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-10 my-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ProfileList
              profiles={profiles}
              title="Here's the current roster of friends..."
            />
          )}
        </div>
      </div>

      <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
       {testArray.map(stop=> {
        return <MapPin stop={stop} lat= {
          stop.geoPoint.lat
        }
        lon= {
          stop.geoPoint.long
        }/>
       })} 
     
      </GoogleMapReact>
    </div>

    </main>
  );
};

export default Home;
