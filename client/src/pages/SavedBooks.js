import React, { useState, useEffec } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import { getMe, deleteBook } from '../utils/API';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';

// import useQuery
import {useQuery, useMutation } from '@apollo/client';

// import REMOVE_BOOK
import { REMOVE_BOOK } from '../utils/mutations';

// import GET_ME
import { GET_ME } from '../utils/queries'; 

const SavedBooks = () => {
  // const [userData, setUserData] = useState({}); <== starter code
  const [removeBook] = useMutation(REMOVE_BOOK);

  // use this to determine if `useEffect()` hook needs to run again
  const userDataLength = Object.keys(userData).length;

  // REMOVE useEffect hook
  // useEffect(() => {
  //   const getUserData = async () => {
  //     try {
  //       const token = Auth.loggedIn() ? Auth.getToken() : null;

  //       if (!token) {
  //         return false;
  //       }

  //       const response = await getMe(token);

  //       if (!response.ok) {
  //         throw new Error('something went wrong!');
  //       }

  //       const user = await response.json();
  //       setUserData(user);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  //   getUserData();
  // }, [userDataLength]);

  // use object destructuring to extract `data` from the `useQuery` Hook's response and rename it `userData` to be more descriptive
  const { data: userData } = useQuery(GET_ME);

        // declare id for parameter use
        const { id: bookId } = useParams();

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const HandleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      // delete deletebook function
      // const response = await deleteBook(bookId, token); <== starter code

      // use query with inported Hook functionality 
      // enable book data to be queried
      // const = useMutation(REMOVE_BOOK, {
      //   variables: {id: bookId }
      // });
      const {data} = removeBook({
        variables: {bookId}
      })

      // get book data out of query's response
      // data.books needs to be accessed
      // const books = data?.books || [];
      // console.log(books);

      if (!data) {
        throw new Error('something went wrong!');
      }

      // const updatedUser = await data.json();
      // setUserData(updatedUser); <== starter code
      // upon success, remove book's id from localStorage
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (!userDataLength) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <CardColumns>
          {userData.savedBooks.map((book) => {
            return (
              <Card key={book.bookId} border='dark'>
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => HandleDeleteBook(book.bookId)}>
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedBooks;
