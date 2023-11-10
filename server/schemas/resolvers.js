const { Profile, Tour, Stop } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    profiles: async () => {
      return Profile.find();
    },

    profile: async (parent, { profileId }) => {
      return Profile.findOne({ _id: profileId });
    },

    tours: async () => {
      return Tour.find()
    },

    tour: async (parent, { tourId}) => {
      return Tour.findOne({_id: tourId})
    },

    stops: async () => {
      return Stop.find()
    },

    stop: async (parent, { tourId}) => {
      return Tour.findOne({_id: tourId})
    }
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

    addSkill: async (parent, { profileId, skill }) => {
      return Profile.findOneAndUpdate(
        { _id: profileId },
        {
          $addToSet: { skills: skill },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    removeProfile: async (parent, { profileId }) => {
      return Profile.findOneAndDelete({ _id: profileId });
    },
    removeSkill: async (parent, { profileId, skill }) => {
      return Profile.findOneAndUpdate(
        { _id: profileId },
        { $pull: { skills: skill } },
        { new: true }
      );
    },

    saveTour: async (parent, { newTour }, context) => {
      if (context.tour) {
        const updatedTour = await Tour.findByIdAndUpdate(
          { _id: context.tour._id },
          { $push: { savedTours: newTour }},
          { new: true, runValidators: true }
        );
        return updatedTour;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeBook: async (parent, { tourId }, context) => {
      if (context.tour) {
        const updatedTour = await Tour.findByIdAndUpdate(
          { _id: context.tour._id },
          { $pull: { savedTours: { tourId }}},
          { new: true }
        );
        return updatedTour;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
