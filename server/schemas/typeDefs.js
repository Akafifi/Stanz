const typeDefs = `
  type Profile {
    _id: ID
    name: String
    email: String
    password: String
    tours: [Tour]
  }
  

  type Tour {
    _id: ID!
    artist: String!
    user: Profile
    stops: [Stop]
  }

  input TourInput {
    artist: String
    user: ID
    stops: [StopInput]
  }

  input StopInput {
    city: String
    state: String
    dateTime: String
    geoPoint: GeopointInput
    venue: String
  }

  type Geopoint {
    lat: String!
    long: String!
  }

  input GeopointInput {
    lat: String!
    long: String!
  }

  type Stop {
    _id: ID
    city: String!
    state: String!
    dateTime: String
    geoPoint: Geopoint
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
    # stops: [Stop]
    tour(_id: ID!) : Tour
    # stop()

  }

  type Mutation {
    addProfile(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveTour(tour: TourInput!): Tour
    deleteTour(_id: ID!, tourId: ID!): Tour
    removeProfile(profileId: ID!): Profile
  }
`;

module.exports = typeDefs;
