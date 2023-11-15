import { gql } from '@apollo/client';

export const ADD_PROFILE = gql`
mutation addProfile($name: String!, $email: String!, $password: String!) {
  addProfile(name: $name, email: $email, password: $password) {
    token
    profile {
      _id
      email
      name
    }
  }
}
`;

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    profile {
      _id
      email
      name
    }
  }
}
`;

export const SAVE_TOUR = gql`
mutation SaveTour($tour: TourInput!) {
  saveTour(tour: $tour) {
    _id
    artist
    stops {
      _id
      city
      dateTime
      geoPoint {
        lat
        long
      }
      state
      venue
    }
  }
}
`
