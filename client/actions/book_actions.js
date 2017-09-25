import axios from 'axios';

import { ADD_BOOK, GET_ALL_BOOKS, GET_RENTED_BOOKS, GET_CATEGORY } from './types';

const API_URL = 'http://localhost:8000/api/v1/books',
  USER_API_URL = 'http://localhost:8000/api/v1/users';

export function addNewBook(bookDetails) {
  return dispatch => axios.post(API_URL, bookDetails)
    .then((res) => {
      dispatch({
        type: ADD_BOOK,
        message: res.data.message
      });
    })
    .catch(error => error);
}

export function getAllBooks() {
  return dispatch => axios.get(API_URL)
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

export function addCategory(data) {
  return axios.post(`${API_URL}/cat`, data)
    .then(res => res.data.message)
    .catch(error => error);
}

export function rentBook(userId, bookId) {
  return axios.post(`${USER_API_URL}/${userId}/books`, bookId)
    .then(res => res.data.message)
    .catch(error => error.response.data.message);
}

export function getRentedBooks(userId) {
  return dispatch => axios.get(`${API_URL}/logs/${userId}`)
    .then((res) => {
      dispatch({
        type: GET_RENTED_BOOKS,
        data: res.data
      });
      return res.data;
    })
    .catch(error => error);
}

export function returnBook(userId, bookId) {
  return axios.put(`${USER_API_URL}/${userId}/books`, bookId)
    .then(res => res.data)
    .catch(error => error);
}

export function getSpecificBook(userId) {
  return axios.get(`${API_URL}/${userId}`)
    .then(res => res.data)
    .catch(error => error);
}

export function getCategory() {
  return dispatch => axios.get('/api/v1/category')
    .then((res) => {
      dispatch({
        type: GET_CATEGORY,
        data: res.data
      });
    })
    .catch(error => error);
}
