const db = require('../config/connection');
const { Profile, Tour } = require('../models');
const profileSeeds = require('./profileSeeds.json');

const lukeCombsTourData = require('./lukeCombsTourData.json');


const cleanDB = require('./cleanDB');

const mapTicketMasterEventsToStanzEvents = (ticketmasterEvents = []) => {

  return ticketmasterEvents.map(event => {
    const venue = event._embedded.venues[0]
    console.log(event.dates.start.dateTime)
    return {
      venue: venue.name,
      dateTime: event.dates.start.dateTime,
      city: venue.city.name,
      state: venue.state.stateCode,
      geoPoint: {
        lat: venue.location.latitude,
        long: venue.location.longitude,
      }

    }

  })
}

const artist = 'lukecombs'

db.once('open', async () => {
  try {
    await cleanDB('Tour', 'tours')

    await cleanDB('Profile', 'profiles');

    const profiles = await Profile.create(profileSeeds);
    const stops = mapTicketMasterEventsToStanzEvents(lukeCombsTourData._embedded.events)
    const userId = profiles[0]._id
    const tour = await Tour.create({
      artist,
      stops,
      user: userId
    })

    await Profile.findByIdAndUpdate(userId, { $push: { tours: tour._id } })

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});

