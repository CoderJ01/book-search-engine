// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`
    
    type Query {
        me: String // User
    }
`;

// export the typeDefs
module.exports = typeDefs;