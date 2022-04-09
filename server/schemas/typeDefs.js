// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create typeDefs
// type User = query set up to retrieve array of all User data from database
// // 'type User' is the front-end (GraphQL) equivalent of /api/users
// type Book = query set up to retrieve array of all Book data from database
// // 'type Book' is the front-end (GraphQL) equivalent of /api/books

// LOGIN_USER
// ADD_USER
// SAVE_BOOK
// REMOVE_BOOK
const typeDefs = gql`
    
    type User {
        _id: ID
        username: String
        email: String
        bookCount: Int
        savedBooks: [bookSchema]
    }

    type Book {
        _id: ID
        authors: String
        bookId: String
        image: String
        link: String
        title: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        user: [User]
        user(username: String!): User
        books(username: String): [bookSchema]
        thought(_id: ID!): Book
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(username: String!, email: String!, password: String!): Auth
        removeBook(username: String!, email: String!, password: String!): Auth
    }
`;

// export the typeDefs
module.exports = typeDefs;