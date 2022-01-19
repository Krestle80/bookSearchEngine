import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      User {
        _id
        name
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($userId: ID!, $bookData: String!) {
    saveBook(userId: $userId, bookData: $bookData) {
        User{
            _id
            username
            savedBooks
        }
    }
  }
`;

export const DELETE_BOOK = gql`
mutation deleteBook($userId: ID!, $bookId: String!){
    deleteBook( bookId: $bookId)
    User{
        _id
        username
        savedBooks
    }
}
`