import axios from 'axios';

import { ADD_BOOK,
  GET_ALL_BOOKS,
  GET_RENTED_BOOKS,
  GET_CATEGORY,
  ADD_CATEGORY,
  GET_ONE_BOOK,
  SEARCH_BOOK,
  EDIT_BOOK,
  RETURN_RENTED_BOOK,
  DELETE_BOOK
} from './types';

const API_URL = '/api/v1/books',
  SEARCH_API_URL = '/api/v1/search',
  USER_API_URL = '/api/v1/users';

/**
 * Add new book action
 * @param {Object} bookDetails 
 * @returns { Object }
 */

export function addBookAction(bookDetails) {
  return dispatch => axios.post(API_URL, bookDetails)
    .then((res) => {
      dispatch({
        type: ADD_BOOK,
        message: res.data.message
      });
    })
    .catch(error => error);
}

/**
 * Get all books action
 * @returns { Object }
 */

export function getAllBooksAction() {
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

/**
 * Delete book action
 * @param {Number} bookId 
 * @returns { String }
 */

export function deleteBookAction(bookId) {
  return dispatch => axios.delete(`${API_URL}/delete/${bookId}`)
    .then((res) => {
      dispatch({
        type: DELETE_BOOK,
        data: Number(res.data.id)
      });
      return res.data.message;
    })
    .catch(error => error);
}

/**
 * Modify book action
 * @param {Object, Number} bookData BookId
 * @returns { String }
 */

export function modifyBookAction(bookData, bookId) {
  return dispatch => axios.put(`${API_URL}/${bookId}`, bookData)
    .then((res) => {
      dispatch({
        type: EDIT_BOOK,
        data: res.data.book
      });
      return res.data.message;
    })
    .catch(error => error);
}

/**
 * 
 * @param { Object } data 
 * @returns { String }
 */

export function addCategoryAction(data) {
  return dispatch => axios.post(`${API_URL}/cat`, data)
    .then((res) => {
      dispatch({
        type: ADD_CATEGORY,
        data: res.data.category
      });
      return res.data.message;
    })
    .catch(error => error);
}

/**
 * Rent book action
 * @param { Number } userId 
 * @returns { String }
 */

export function rentBookAction(userId, bookId) {
  return axios.post(`${USER_API_URL}/${userId}/books`, bookId)
    .then(res => res.data.message)
    .catch(error => error.response.data.message);
}

/**
 * Get rented books action
 * @param {  Number } userId 
 * @returns { Object }
 */

export function getRentedBooksAction(userId) {
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

/**
 * Return rented book action
 * @param {Number} userId 
 * @returns { Object }
 */

export function returnBook(userId, bookId) {
  return dispatch => axios.put(`${USER_API_URL}/${userId}/books`, bookId)
    .then((res) => {
      dispatch({
        type: RETURN_RENTED_BOOK,
        data: res.data.book
      });
      return res.data.message;
    })
    .catch(error => error);
}

/**
 * Get specific book
 * @param {Number} BookId 
 * @returns { Object }
 */

export function getSpecificBook(bookId) {
  return dispatch => axios.get(`${API_URL}/${bookId}`)
    .then((res) => {
      dispatch({
        type: GET_ONE_BOOK,
        data: res.data
      });
      return res.data;
    })
    .catch(error => error);
}

/**
 * Get all category action
 * @returns { Object }
 */

export function getCategoryAction() {
  return dispatch => axios.get('/api/v1/category')
    .then((res) => {
      dispatch({
        type: GET_CATEGORY,
        data: res.data
      });
    })
    .catch(error => error);
}

/**
 * Search for a book action
 * @param {any} query 
 * @returns { Object }
 */

export function searchAction(query) {
  return dispatch => axios.post(SEARCH_API_URL, query)
    .then((res) => {
      dispatch({
        type: SEARCH_BOOK,
        data: res.data
      });
      return res.data;
    })
    .catch(error => error);
}
