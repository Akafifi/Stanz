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
      return Tour.find()
    },

    tour: async (parent, { _id }) => {
      return Tour.findOne({ _id })
    },

    // stops: async () => {
    //   return Stop.find()
    // },

    // stop: async (parent, { tourId}) => {
    //   return Tour.findOne({_id: tourId})
    // }
  },

  Mutation: {
    addProfile: async (parent, { name, email, password }) => {
      const profile = await Profile.create({ name, email, password });
      const token = signToken(profile);

      return { token, profile };
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
    saveTour: async (parent, { newTour }, context) => {
      if (context.tour) {
        const updatedTour = await Tour.findByIdAndUpdate(
          { _id: context.tour._id },
          { $push: { savedTours: newTour } },
          { new: true, runValidators: true }
        );
        return updatedTour;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
