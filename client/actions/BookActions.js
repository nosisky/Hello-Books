import axios from 'axios';
import swal from 'sweetalert';
import Materialize from 'materialize-css';

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
 * @param {Object} bookDetails - Object containing book data
 * 
 * @returns { Object } - Redux action to be dispatched to the store
 */
export function addBookAction(bookDetails) {
  return dispatch => axios.post(API_URL, bookDetails)
    .then((res) => {
      dispatch({
        type: ADD_BOOK,
        message: res.data.message,
        book: res.data.book
      });
      Materialize.toast('Book added Successfully', 1000, '#15b39d', () => {
        $('.modal').modal('close');
      });
    })
    .catch(error => Materialize.toast(error.response.data.message));
}

/**
 * Get all books action
 * @param { Number } page - current Page number  
 *
 * @returns { Object } - Object containing book data
 */
export function getAllBooksAction(page) {
  return dispatch => axios.get(`${API_URL}/?page=${page}`)
    .then((res) => {
      dispatch({
        type: GET_ALL_BOOKS,
        books: res.data
      });
      return res.data;
    })
    .catch(error => Materialize.toast(error.response.data.message, 1000));
}

/**
 * Delete book action
 * @param {Number} bookId - Book ID
 *
 * @returns { String } - string containing API message
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
    .catch(error => Materialize.toast(error.response.data.message, 1000));
}

/**
 * Modify book action
 * @param {Object} bookData - Object containing Book Data
 * 
 * @param {bookId} bookId - ID of book to be modified
 *
 * @returns { String } - Messge fro API
 */
export function modifyBookAction(bookData, bookId) {
  return dispatch => axios.put(`${API_URL}/${bookId}`, bookData)
    .then((res) => {
      dispatch({
        type: EDIT_BOOK,
        data: res.data.book
      });
      Materialize.toast('Book modified successfully', 1000, 'blue', () => {
        this.setState({ displayBook: true, edit: false });
      });
    })
    .catch(error => Materialize.toast(error.response.data.message, 1000));
}

/**
 * 
 * @param { Object } data - New category data
 * 
 * @returns { String } - Message from the API
 */
export function addCategoryAction(data) {
  return dispatch => axios.post(`${API_URL}/cat`, data)
    .then((res) => {
      dispatch({
        type: ADD_CATEGORY,
        data: res.data.category
      });
      Materialize.toast('Category added successfully', 2000, 'blue');
      $('.modal').modal('close');
    })
    .catch(error => Materialize.toast(error.response.data.message, 1000));
}

/**
 * Rent book action
 * @param { Number } userId - User Id
 * 
 * @param { Number } bookId - Book ID
 * 
 * @returns { String } - String
 */
export function rentBookAction(userId, bookId) {
  return axios.post(`${USER_API_URL}/${userId}/books`, bookId)
    .then((response) => {
      const message = response.data.message;
      if (message === 'You have successfully rented the book') {
        swal(message, { icon: 'success' });
      } else {
        swal(message, { icon: 'warning' });
      }
    })
    .catch(error => swal(error.response.data.message));
}

/**
 * Get rented books action
 * @param {  Number } userId - User ID
 * 
 * @returns { Object } - Object containing rented books
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
    .catch(error => Materialize.toast(error.response.data.message, 1000));
}

/**
 * Return rented book action
 * @param {Number} userId - User ID
 * 
 * @param {Number}  bookId - Book ID
 * 
 * @returns { Object } - Object
 */
export function returnBook(userId, bookId) {
  return dispatch => axios.put(`${USER_API_URL}/${userId}/books`, bookId)
    .then((response) => {
      const message = response.data.message;
      if (response) {
        swal(message, { icon: 'success' });
      } else {
        swal(message, { icon: 'warning' });
      }
      dispatch({
        type: RETURN_RENTED_BOOK,
        data: response.data.book
      });
    })
    .catch(error => swal(error.response.data.message));
}

/**
 * Get specific book
 * @param {Number} bookId - Book ID
 *
 * @returns { Object } - Object containg Book details
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
    .catch(error => Materialize.toast(error.response.data.message, 1000));
}

/**
 * Get all category action
 * @returns { Object } - Object containg all categories
 */
export function getCategoryAction() {
  return dispatch => axios.get('/api/v1/category')
    .then((res) => {
      dispatch({
        type: GET_CATEGORY,
        data: res.data
      });
    })
    .catch(error => Materialize.toast(error.response.data.message, 1000));
}

/**
 * Search for a book action
 * @param {Object} query - Object containg search query
 *
 * @returns { Object } - response that mateches the serach criteria
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
    .catch(error => Materialize.toast(error.response.data.message, 1000));
}
