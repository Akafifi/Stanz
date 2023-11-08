const { Schema, model } = require('mongoose')

const stopSchema = new Schema({
  city: String,
  state: String,
  dates: [String],
  geoPoint: {
    lat: String,
    long: String
  },
  venue: String,
})

module.exports = { stopSchema }