const { Schema, model } = require('mongoose')
const { stopSchema } = require('./Stop')

const tourSchema = new Schema({
  artist: String,
  stops: [stopSchema],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  }
})

const Tour = model('Tour', tourSchema)

module.exports = { Tour, tourSchema }