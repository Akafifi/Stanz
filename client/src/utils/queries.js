import { gql } from '@apollo/client';

export const QUERY_PROFILES = gql`
query profiles {
  profiles {
    _id
    name
    email
    password
    tours {
      _id
      artist
      user {
        _id
      }
      stops {
        dateTime
        geoPoint {
          lat
          long
        }
        _id
        city
        state
        venue
      }
    }
  }
}
`;

export const QUERY_SINGLE_PROFILE = gql`
query profile($profileId: ID!) {
  profile(profileId: $profileId) {
    _id
    name
    email
    password
    tours {
      _id
      artist
      user {
        _id
      }
      stops {
        _id
        city
        state
        dateTime
        geoPoint {
          lat
          long
        }
        venue
      }
    }
  }
}
`;
