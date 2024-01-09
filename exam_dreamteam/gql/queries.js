import { gql } from "@apollo/client";

export const GET_LEVELS = gql`
  query GetLevels {
    levels {
      id,
      name
    }
  }
`;

export const GET_FOOTBALLERS = gql`
  query GetFootballers($filter: String!) {
    footballers (order_by: {lastname: asc},
                 where: {position: {_like: $filter}}){
      id
      firstname
      lastname
      nationality {
        name
        emoji
      }
    }
  }
`;

export const INSERT_VOTE = gql`
  mutation InsertVote($dreamteam: String!, $goalkeeper: String!, $fieldplayer: String!, $striker: String!) {
    insert_votes(objects: [ {dreamteam: $dreamteam, goalkeeper: $goalkeeper, fieldplayer: $fieldplayer, striker: $striker}]) {
      returning {
        id
      }
    }
  }
`;