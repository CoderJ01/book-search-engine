// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create typeDefs
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