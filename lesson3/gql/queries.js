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
      order_by: {name: asc}
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
      data: countries {
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

export const GET_FILTERED_COUNTRIES = gql`
  query GetFilteredCountries($filter: String!) {
    countries (
      where: { name: { _ilike: $filter } }
      order_by: { name: asc }
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