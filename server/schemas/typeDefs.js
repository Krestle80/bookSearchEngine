const { gql } = require('apollo-server-express');

const typeDefs = gql`   
     type User {
        _id: ID!
        username: String!
        email: String
        password: String
        savedBooks: [Book]
    }
    type Auth {
        token: ID!
        user: User
      }
    type Book {
        _id: ID!
        authors: String
        description: String
        bookId: String
        image: String
        link: String
        title: String
    }
    type Query {
        me: Profile
        user(userId:ID!): User
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(username:String, email: String, password: String!): Auth
        saveBook(bookData: String!): User
        deleteBook(bookId : bookId!): User
    }
`
module.exports = typeDefs