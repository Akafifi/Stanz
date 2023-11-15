const { Schema, model } = require('mongoose')


const stopSchema = new Schema({
  city: String,
  state: String,
  dateTime: String,
  geoPoint: {
    lat: String,
    long: String
  },
  venue: String,
})

const Stop = model('Stop', stopSchema);

module.exports = {
  stopSchema,
  Stop
}