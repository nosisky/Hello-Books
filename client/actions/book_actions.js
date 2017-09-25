import axios from 'axios';

import { ADD_BOOK, GET_ALL_BOOKS } from './types';

const API_URL = 'http://localhost:8000/api/v1/books';

export function addNewBook(bookDetails) {
  return dispatch => axios.post(`${API_URL}`, bookDetails)
    .then((res) => {
      dispatch({
        type: ADD_BOOK,
        message: res.data.message
      });
    })
    .catch(error => error);
}

export function getAllBooks() {
  return dispatch => axios.get(`${API_URL}`)
    .then((res) => {
      dispatch({
        type: GET_ALL_BOOKS,
        data: res.data
      });
      return res.data;
    })
    .catch(error => error);
}

export function deleteBook(bookId) {
  return axios.delete(`${API_URL}/delete/${bookId}`)
    .then(res => res.data.message)
    .catch(error => error);
}

export function modifyBook(bookData, bookId) {
  return axios.put(`${API_URL}/${bookId}`, bookData)
    .then(res => res.data.message)
    .catch(error => error);
}

