import { useState } from 'react'
import pin from '../assets/placeholder.png'
import moment from 'moment'
import { Card } from 'react-bootstrap'

const MapPin = ({ stop }) => {
  const [isShown, setIsShown] = useState(false)
  const date = moment(stop.dateTime).format('YYYY/MM/DD h:mm:ss')

  return (
    <>
      <div
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
      >
        <img src={pin} alt="" style={{ width: 20 }} />
      </div>
      {isShown && (
        <Card className="bg-warning" style={{ width: 100 }}>
          <h6 className="text-center"> {stop.venue} </h6>
          <ul className="text-center list-group text-decoration-none">
            <li className="">
              {stop.city}, {stop.state}
            </li>
            <li>{date}</li>
          </ul>
        </Card>
      )}
    </>
  )
}

export default MapPin
