const { Profile, Tour, Stop } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    profiles: async () => {
      return Profile.find().populate('tours');
    },

    profile: async (parent, { profileId }) => {
      return Profile.findOne({ _id: profileId }).populate('tours');
    },

    tours: async () => {
      return Tour.find().populate('user')
    },

    tour: async (parent, { _id }) => {
      return Tour.findOne({ _id }).populate('user')
    },
  },

  Mutation: {
    addProfile: async (parent, { name, email, password }) => {
      const profile = await Profile.create({ name, email, password });
      const token = signToken(profile);

      return { token, profile };
    },
    addStop: async (parent, { dateTime, city, venue }) => {
      const stop = await Stop.create({ city, dateTime, venue });

      return stop


    },
    login: async (parent, { email, password }) => {
      const profile = await Profile.findOne({ email });

      if (!profile) {
        throw AuthenticationError;
      }

      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(profile);
      return { token, profile };
    },
    removeProfile: async (parent, { profileId }) => {
      return Profile.findOneAndDelete({ _id: profileId });
    },
    saveTour: async (parent, { tour }, context) => {
      // console.log(tour)
      // if (context.user) {
      const updatedTour = (await Tour.create(tour))
      const user = await Profile.findByIdAndUpdate(tour.user, { $push: { tours: updatedTour._id } })
      return updatedTour;
      // }
      throw new AuthenticationError('You need to be logged in!');
    },
    deleteTour: async (parent, { _id }) => {
      const deletedTour = await Tour.findByIdAndDelete(_id)
      await Profile.findByIdAndUpdate(deletedTour.user, { $pull: { tours: _id } })
      return deletedTour
    }

  },
};

module.exports = resolvers;
