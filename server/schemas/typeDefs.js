// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create typeDefs
// type User = query set up to retrieve array of all User data from database
// // 'type User' is the front-end (GraphQL) equivalent of /api/users
// type Book = query set up to retrieve array of all Book data from database
// // 'type Book' is the front-end (GraphQL) equivalent of /api/books
const typeDefs = gql`
    
    type User {
        _id: ID
        username: String
        email: String
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
`;

// export the typeDefs
module.exports = typeDefs;