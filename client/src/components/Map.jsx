import GoogleMapReact from 'google-map-react'
import MapPin from '../components/mapPin'

const Map = ({ events = [] }) => {
  const defaultProps = {
    center: {
      lat: 37.1,
      lng: -95.5,
    },
    zoom: 4,
  }

  return (
    <div
      style={{ height: '50vh', width: '80%' }}
      className="m-4 border border-2 shadow"
    >
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyBoQHlU4edUPiQH1TPsRRc2bhtV8nhCAK8' }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        {events.map((stop) => {
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
  )
}

export default Map
