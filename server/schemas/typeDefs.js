const typeDefs = `
  type Profile {
    _id: ID
    name: String
    email: String
    password: String
    skills: [String]!
  }
  

  type Tour {
    _id: ID!
    artist: String!
    user: [Profile]

  }

  type Stop {
    _id: ID
    city: String!
    state: String!
    dates: [String!]
    geopoint: {
      lat: String!
      long: String!
    }
    venue: String
  }

  type Auth {
    token: ID!
    profile: Profile
  }

  type Query {
    profiles: [Profile]!
    profile(profileId: ID!): Profile
    tours: [Tour]
    stops: [Stop]

  }

  type Mutation {
    addProfile(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveTour(_id: ID!, tour: TourInput!): Profile
    deleteTour(_id: ID!, tourId: ID!): Profile

    addSkill(profileId: ID!, skill: String!): Profile
    removeProfile(profileId: ID!): Profile
    removeSkill(profileId: ID!, skill: String!): Profile
  }
`;

module.exports = typeDefs;