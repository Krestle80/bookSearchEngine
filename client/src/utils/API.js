import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from './queries';
import { ADD_USER, SAVE_BOOK } from './mutations';
// route to get logged in user's info (needs the token)
export const getMe = (token) => {
  const {loading, data } = useQuery(QUERY_ME)
  return data 
  // return fetch('/api/users/me', {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     authorization: `Bearer ${token}`,
  //   },
};

export const createUser = (userData) => {
  const{loading, data} = useMutation(ADD_USER, {
    variables: {username: userData.username,
    email: userData.email,
    password: userData.password
    }
    
  })
  return data
  // return fetch('/api/users', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(userData),
  // });
};

export const loginUser = (userData) => {
  return fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

// save book data for a logged in user
export const saveBook = (bookData, token) => {
    let user = getMe()

    let {loading, data} = useMutation(SAVE_BOOK, {
      variables: {
        userId: user._id,
        bookData: bookData
      }
    }
    )
    return data
  // return fetch('/api/users', {
  //   method: 'PUT',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     authorization: `Bearer ${token}`,
  //   },
  //   body: JSON.stringify(bookData),
  // });
};

// remove saved book data for a logged in user
export const deleteBook = (bookId, token) => {

  let {loading, data} = useMutation(SAVE_BOOK, {
    variables: {
      bookId: bookId
    }
  }
  )
  return data
  // return fetch(`/api/users/books/${bookId}`, {
  //   method: 'DELETE',
  //   headers: {
  //     authorization: `Bearer ${token}`,
  //   },
  // });
};

// make a search to google books api
// https://www.googleapis.com/books/v1/volumes?q=harry+potter
export const searchGoogleBooks = (query) => {
  return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
};
