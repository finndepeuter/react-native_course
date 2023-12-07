import { gql } from "@apollo/client";

export const GET_CONTINENTS = gql`
  query GetContinents {
    continents {
      id
      code
      name
    }
  }
`;

export const GET_COUNTRIES = gql`
  query GetCountries {
    countries (
      order_by: {naam: asc}
    ){
      name
      capital
      emoji
      continent {
        name
      }
    }
  }
`;

export const GET_CONTINENTS_COUNTRIES = gql`
  query GetContinentsCountries {
    continents {
      id
      code
      name
      countries {
        code
        name
        capital
        emoji
        continent {
          name
        }
      }
    }
  }
`;