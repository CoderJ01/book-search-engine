import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($email: String!, $password: String!) {
        addUser(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const SAVE_BOOK = gql`
    mutation saveBook($author: String!) {
        savedBook($author: $author) {
            _id
            author
            description
            image
            link
            title
        }
    }
`;

export const REMOVE_BOOK = gql`
    mutation removeBook($author: String!) {
        removeBook($author: $author) {
            _id
            author
            description
            image
            link
            title
        }
    }
`;