import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql` 
query GetCategories {
    categories(order_by: { name: asc }) {
        id
        name
    }
}
`;

export const GET_FILTERED_BEVERAGES = gql`
query GetFilteredBeverages($categoryId: Int!) {
    beverages(where: { category_id: { _eq: $categoryId } }, order_by: { name: asc }) {
      id
      name
      price
      plus18
      category_id
    }
  }
`;