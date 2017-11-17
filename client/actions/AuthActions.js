import axios from 'axios';
import jwt from 'jsonwebtoken';

import { setAuthorizationToken } from '../utils/Authorization';

import { SET_CURRENT_USER, UNAUTH_USER } from './types';

const API_URL = '/api/v1/users';

const SEARCH_API_URL = '/api/v1/search';

/**
 * Register User Action
 * @param {Object} userDetails 
 * @returns {Object}
 */

export function setCurrentUser(decoded) {
  return {
    type: SET_CURRENT_USER,
    user: decoded.currentUser,
    authenticated: true
  };
}

export function registerUserAction(userDetails) {
  return dispatch => axios.post(`${API_URL}/signup`, userDetails)
    .then((res) => {
      const token = res.data.Token;
      localStorage.setItem('token', token);
      setAuthorizationToken(token);
      dispatch({
        type: SET_CURRENT_USER,
        user: jwt.decode(res.data.Token),
        authenticated: true
      });
    });
}


/** Login action 
 * @param {Object} userDetails 
 * @returns { Object }
 */

export function loginAction(userDetails) {
  return dispatch => axios.post(`${API_URL}/signin`, userDetails)
    .then((res) => {
      const token = res.data.Token;
      localStorage.setItem('token', token);
      setAuthorizationToken(token);
      const decoded = jwt.decode(res.data.Token);
      dispatch(setCurrentUser(decoded));
    });
}

/** Logout action
 * @returns { Object }
 */

export function logoutAction() {
  return (dispatch) => {
    localStorage.removeItem('token');
    setAuthorizationToken(false);
    dispatch({
      type: UNAUTH_USER,
      user: {},
      authenticated: false
    });
    window.location.href = '/';
  };
}

/** Edit profile action
 * @param {Object} userId userData
 * @returns { String }
 */

export function editProfileAction(userId, userData) {
  return axios.put(`${API_URL}/edit/${userId}`, userData)
    .then(() => axios.get(`${SEARCH_API_URL}/${userId}`)
      .then(res => res.data.token))
    .catch(error => error.data.response);
}

/**
 *  Get users by email action
 * @param { object } email 
 * @returns { String }
 */

export function getUserByEmailAction(email) {
  return axios.post(`${SEARCH_API_URL}/email`, email)
    .then(res => res.data.token)
    .catch(error => error.data.response);
}
