const MapPin = ({stop}) => {
    return (
        <div> 
         <h3> {stop.venue}  </h3>
            <p>
                    {stop.city } 
                    {stop.state}
            </p>
        </div>


    )
}

export default MapPin;
