const { Schema } = require('mongoose')

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

module.exports = stopSchema 