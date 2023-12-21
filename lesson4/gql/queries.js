import { gql } from "@apollo/client";

export const GET_COUNTRIES = gql`
  query GetCountries($uid: String!) {
    visits(where: { uid: { _eq: $uid } }) {
      id
      country {
        id
        name
        currency
        capital
        code
        emoji
        emojiu
        continent {
          id
          name
        }
      }
    }
  }
`;