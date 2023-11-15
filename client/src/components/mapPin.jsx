import { useState } from 'react'
import pin from '../assets/placeholder.png'
import moment from 'moment'
import PropTypes from 'prop-types';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap'

MapPin.propTypes = {
  stop: PropTypes.shape({
    dateTime: PropTypes.string.isRequired,
    venue: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
  }).isRequired,
};

const MapPin = ({ stop }) => {
  const [isShown, setIsShown] = useState(false)
  const date = moment(stop.dateTime).format('MM/DD/YYYY h:mm')

  return (
    <>
      <div
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
      >
        <img src={pin} alt="" style={{ width: 20 }} />
      </div>
      {isShown && (
        <Card className="bg-success text-light z-2" style={{ width: 150 }}>
          <h6 className="text-center p-1"> {stop.venue} </h6>
          <ListGroup className="text-center list-group ">
            <ListGroupItem className="">
              {stop.city}, {stop.state}
            </ListGroupItem>
            <ListGroupItem>{date}</ListGroupItem>
          </ListGroup>
        </Card>
      )}
    </>
  )
}

export default MapPin
