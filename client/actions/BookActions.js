import axios from 'axios';
import swal from 'sweetalert';
import Materialize from 'materialize-css';

import { setApiCallProgress } from './UserActions';

import notifyNetworkError from '../utils/notifyNetworkError';


import { ADD_BOOK,
  GET_ALL_BOOKS,
  GET_RENTED_BOOKS,
  GET_CATEGORY,
  ADD_CATEGORY,
  SEARCH_BOOK,
  EDIT_BOOK,
  RETURN_RENTED_BOOK,
  DELETE_BOOK,
  GET_ALL_NOTIFICATIONS,
  RENT_BOOK
} from './ActionTypes';


const apiUrl = '/api/v1/books';
const searchApiUrl = '/api/v1/search';
const userApiUrl = '/api/v1/users';

/**
 * @description - Add new book action
 *
 * @param {Object} bookDetails - Object containing book data
 *
 * @returns { Object } - Redux action to be dispatched to the store
 */
export const addBookAction = bookDetails => (dispatch) => {
  dispatch(setApiCallProgress(true));
  return axios.post(apiUrl, bookDetails)
    .then((response) => {
      dispatch({
        type: ADD_BOOK,
        message: response.data.message,
        book: response.data.book
      });
      dispatch(setApiCallProgress(false));
      Materialize.toast('Book added Successfully', 1000, '#15b39d', () => {
        document.getElementById('book_form').reset();
        $('.modal').modal('close');
      });
    })
    .catch(error => notifyNetworkError(error));
};


/**
 *@description -  Get all notifications
 *
 * @export { Function } - Get all notification action creator
 *
 * @returns { Object } - Dispatched objects
 */
export function getAllNotifications() {
  return dispatch => axios.get('/api/v1/notification')
    .then((response) => {
      dispatch({
        type: GET_ALL_NOTIFICATIONS,
        notifications: response.data,
      });
    })
    .catch(error => notifyNetworkError(error));
}

/**
 * @description - Get all books action
 *
 * @param { Number } page - current Page number
 *
 * @returns { Object } - Object containing book data
 */
export const getAllBooksAction = page => (dispatch) => {
  dispatch(setApiCallProgress(true));
  return axios.get(`${apiUrl}/?page=${page}`)
    .then((response) => {
      dispatch({
        type: GET_ALL_BOOKS,
        books: response.data
      });
      dispatch(setApiCallProgress(false));
      return response.data;
    })
    .catch((error) => {
      dispatch(setApiCallProgress(false));
      notifyNetworkError(error);
    });
};

/**
 * @description - Delete book action
 *
 * @param {Number} bookId - Book ID
 *
 * @returns { String } - string containing API message
 */
export function deleteBookAction(bookId) {
  return dispatch => axios.delete(`${apiUrl}/delete/${bookId}`)
    .then((response) => {
      dispatch({
        type: DELETE_BOOK,
        data: Number(response.data.id)
      });
      return response.data.message;
    })
    .catch(error => notifyNetworkError(error));
}

/**
 * @description - Modify book action
 *
 * @param {Object} bookData - Object containing Book Data
 *
 * @param {bookId} bookId - ID of book to be modified
 *
 * @returns { String } - Messge fro API
 */
export function modifyBookAction(bookData, bookId) {
  return dispatch => axios.put(`${apiUrl}/${bookId}`, bookData)
    .then((response) => {
      dispatch({
        type: EDIT_BOOK,
        data: response.data.book
      });
      Materialize.toast('Book modified successfully', 1000, 'blue', () => {
      });
    })
    .catch(error => notifyNetworkError(error));
}

/**
 * @description - Add category action
 *
 * @param { Object } data - New category data
 *
 * @returns { String } - Message from the API
 */
export function addCategoryAction(data) {
  return dispatch => axios.post(`${apiUrl}/category`, data)
    .then((response) => {
      dispatch({
        type: ADD_CATEGORY,
        data: response.data.newCategory
      });
      Materialize.toast('Category added successfully', 2000, 'blue');
      $('.modal').modal('close');
      document.getElementById('category_form').reset();
    })
    .catch((error) => {
      notifyNetworkError(error);
    });
}

/**
 * @description - Rent book action
 *
 * @param { Number } userId - User Id
 *
 * @param { Number } bookId - Book ID
 *
 * @returns { String } - String
 */
export function rentBookAction(userId, bookId) {
  return dispatch => axios.post(`${userApiUrl}/${userId}/books`, bookId)
    .then((response) => {
      const { message, rentedBook } = response.data;
      if (response.data.status) {
        swal(message, { icon: 'success' });
      } else {
        swal(message, { icon: 'warning' });
      }
      dispatch({
        type: RENT_BOOK,
        rentedBook
      });
    })
    .catch(error => (error.response ?
      swal(error.response.data.message) :
      notifyNetworkError(error)));
}

/**
 * @description - Get rented books action
 *
 * @param {  Number } userId - User ID
 *
 * @returns { Object } - Object containing rented books
 */
export const getRentedBooksAction = userId => (dispatch) => {
  dispatch(setApiCallProgress(true));
  return axios.get(`${apiUrl}/logs/${userId}`)
    .then((response) => {
      if (response.data.length) {
        dispatch({
          type: GET_RENTED_BOOKS,
          data: response.data
        });
      }
      dispatch(setApiCallProgress(false));
      return response.data;
    })
    .catch((error) => {
      dispatch(setApiCallProgress(false));
      notifyNetworkError(error);
    });
};

/**
 * @description - Return rented book action
 *
 * @param {Number} userId - User ID
 *
 * @param {Number}  bookId - Book ID
 *
 * @returns { Object } - Object
 */
export function returnBook(userId, bookId) {
  return dispatch => axios.put(`${userApiUrl}/${userId}/books`, bookId)
    .then((response) => {
      const { message } = response.data;
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
    .catch(error => (error.response ?
      swal(error.response.data.message) :
      notifyNetworkError(error)));
}

/**
 * @description - Get all category action
 *
 * @returns { Object } - Object containg all categories
 */
export function getCategoryAction() {
  return dispatch => axios.get('/api/v1/category')
    .then((response) => {
      dispatch({
        type: GET_CATEGORY,
        data: response.data
      });
    })
    .catch(error => notifyNetworkError(error));
}

/**
 * @description - Search for a book action
 *
 * @param {Object} query - Object containg search query
 *
 * @returns { Object } - response that mateches the serach criteria
 */
export function searchAction(query) {
  return dispatch => axios.post(searchApiUrl, query)
    .then((response) => {
      dispatch({
        type: SEARCH_BOOK,
        data: response.data
      });
      return response.data.rows;
    })
    .catch(error => notifyNetworkError(error));
}
