import { gql } from "@apollo/client";

// enrollments
export const GET_ENROLLMENTS = gql`
    query getEnrollments {
        enrollments {
            id
            grade
            course {
              id
              title
            }
            student {
              id
              firstname
              lastname
            }
        }
    }    
`;

export const GET_ENROLLMENT = gql`
    query GetEnrollment($id: Int!) {
        enrollments_by_pk(id: $id) {
            id
            grade
            course {
              id
              title
            }
            student {
              id
              firstname
              lastname
            }
        }
    }
`;

export const UPDATE_ENROLLMENT = gql`
    mutation UpdateEnrollment($id: Int!, $grade: String!, $courseId: Int!, $studentId: Int!) {
        update_enrollments_by_pk(
            pk_columns: { id: $id }
            _set: { 
                grade: $grade, 
                course_id: $courseId,  
                student_id: $studentId  
            }
        ) {
            id
            grade
            course {
                id
                title
            }
            student {
                id
                firstname
                lastname
            }
        }
    }
`;

export const DELETE_ENROLLMENT = gql`
    mutation DeleteEnrollment($id: Int!) {
        delete_enrollments_by_pk (
            id: $id
        ) {
            id
        }
    }
`;

export const INSERT_ENROLLMENT = gql`
    mutation InsertEnrollment($grade: String!, $courseId: Int!, $studentId: Int!) {
        insert_enrollments(objects: [
            {
                grade: $grade,
                course_id: $courseId,  
                student_id: $studentId 
            }
        ]) {
            returning {
                id
                grade
                course {
                    id
                    title
                }
                student {
                    id
                    firstname
                    lastname
                }
            }
        }
    }
`;
