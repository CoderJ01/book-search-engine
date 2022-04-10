import { gql } from '@apollo/client';

export const GET_ME = gql`
    {
        me {
            _id
            username
            email
            bookCount
            books {
                _id,
                authors,
                description
                bookId
                image
                link
                title
            }
        }
    }
`;