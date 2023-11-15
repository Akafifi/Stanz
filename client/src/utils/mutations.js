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

export const ADD_EVENT = gql`
mutation AddStop($city: String, $dateTime: String, $venue: String) {
  addStop(city: $city, dateTime: $dateTime, venue: $venue) {
    city
    dateTime
    venue
  }
}
`;

export const ADD_SKILL = gql`
  mutation addSkill($profileId: ID!, $skill: String!) {
    addSkill(profileId: $profileId, skill: $skill) {
      _id
      name
      skills
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
