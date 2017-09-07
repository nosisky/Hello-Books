import axios from 'axios';

import { ADD_BOOK } from './types';

const API_URL = 'http://localhost:8000/api/v1/books';

export default function addNewBook(bookDetails) {
  return dispatch => axios.post(`${API_URL}`).then((res) => {
    console.log(res.data);
    dispatch({
      type: ADD_BOOK,
      books: res.data.message
    });
  });
}
