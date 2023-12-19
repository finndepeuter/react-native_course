import { gql } from "@apollo/client";

// courses
export const GET_COURSES = gql`
  query getCourses {
    courses (order_by: {title: asc}) {
      id
      title
      credits
    }
  }
`;

export const GET_COURSE = gql`
  query GetCourse($id: Int!) {
    courses_by_pk(id: $id) {
      id
      title
      credits
    }
  }
`;

export const UPDATE_COURSE= gql`
  mutation UpdateCourse($id: Int!, $title: String!, $credits: Int!) {
    update_courses_by_pk (
      pk_columns: {id: $id}
      _set: { title: $title,
      credits: $credits }
    ) {
      id
    }
  }
`;

export const DELETE_COURSE = gql`
  mutation DeleteCourse($id: Int!) {
    delete_courses_by_pk (
      id: $id
    ) {
      id
    }
  }
`;

export const INSERT_COURSE = gql`
  mutation InsertCourse($title: String!, $credits: Int!) {
    insert_courses(objects: [ {title: $title, credits: $credits}]) {
      returning {
        id
      }
    }
  }
`;