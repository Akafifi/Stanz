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
    user: ID!
    stops: [Stop]
  }

  input TourInput {
    _id: ID
    artist: String
    user: ID
    stops: [StopInput]
  }

  input StopInput {
    _id: ID
    city: String
    state: String
    dates: [String]
    geopoint: GeopointInput
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
    dates: [String!]
    geopoint: Geopoint
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
    saveTour(_id: ID!, tour: TourInput!): Profile
    deleteTour(_id: ID!, tourId: ID!): Profile

    addSkill(profileId: ID!, skill: String!): Profile
    removeProfile(profileId: ID!): Profile
    removeSkill(profileId: ID!, skill: String!): Profile
  }
`;

module.exports = typeDefs;
