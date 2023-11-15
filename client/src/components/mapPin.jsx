import { useState } from 'react'
import SearchArtist from './SearchArtist'
import pin from '../assets/placeholder.png'

const MapPin = ({ stop }) => {
  const [isShown, setIsShown] = useState(false)

  return (
    <>
      <div
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
      >
        <img src={pin} alt="" style={{ width: 20 }} />
      </div>
      {isShown && (
        <div className="">
          <h3 className=""> {stop.venue} </h3>
          <p>
            {stop.city}
            {stop.state}
          </p>
        </div>
      )}
    </>
  )
}

export default MapPin
