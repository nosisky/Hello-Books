import axios from 'axios';
import jwt from 'jsonwebtoken';
import Materialize from 'materialize-css';
import notifyNetworkError from '../utils/notifyNetworkError';
import { setAuthorizationToken } from '../utils/authorization';

import { SET_CURRENT_USER,
  SET_API_STATUS,
  UNAUTH_USER, EDIT_PROFILE } from './ActionTypes';

const apiUrl = '/api/v1/users';

const searchApiUrl = '/api/v1/search';

/**
 * @description - Set current user
 *
 * @param {Object} currentUser - Decoded JWT Token
 *
 * @returns {Object} - redux action to be dispatched
 */
export function setCurrentUser(currentUser) {
  return {
    type: SET_CURRENT_USER,
    user: currentUser,
    authenticated: true
  };
}

/**
 * @description -  Sets API status
 *
 * @export { Function } - Set API Progress
 *
 * @param { Boolean } status - User object
 *
 * @returns {  Object } - Action
 */
export function setApiCallProgress(status) {
  return {
    type: SET_API_STATUS,
    apiStatus: status
  };
}

/**
 *
 * @description - Register user action
 *
 * @param {Object} userDetails - Object containing user details
 *
 * @returns { Object } - Dispatches user object to the store
 */
export const registerUserAction = userDetails => (dispatch) => {
  dispatch(setApiCallProgress(true));
  return axios.post(`${apiUrl}/signup`, userDetails)
    .then((response) => {
      dispatch(setApiCallProgress(false));
      const { token } = response.data;
      localStorage.setItem('token', token);
      setAuthorizationToken(token);
      const decoded = jwt.decode(response.data.token);
      dispatch(setCurrentUser(decoded.currentUser));
      Materialize.toast('Sign Up Successfully', 2000, 'blue darken-4');
    })
    .catch((error) => {
      dispatch(setApiCallProgress(false));
      notifyNetworkError(error);
    });
};


/** @description - Login action
 *
 * @param {Object} userDetails - Object containing user details
 *
 * @returns { Object } - Dispatches user object to the store
 */
export const loginAction = userDetails => (dispatch) => {
  dispatch(setApiCallProgress(true));
  return axios.post(`${apiUrl}/signin`, userDetails)
    .then((response) => {
      dispatch(setApiCallProgress(false));
      const { token } = response.data;
      localStorage.setItem('token', token);
      setAuthorizationToken(token);
      const decoded = jwt.decode(response.data.token);
      dispatch(setCurrentUser(decoded.currentUser));
      Materialize.toast('Logged In Successfully', 1000, 'blue darken-4');
    })
    .catch((error) => {
      dispatch(setApiCallProgress(false));
      notifyNetworkError(error);
    });
};

export const googleLogin = userDetails =>
  dispatch => new Promise((resolve) => {
    const currentUser = userDetails.user;
    currentUser.userId = currentUser.id;
    const token = jwt.sign(
      {
        currentUser,
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)
      },
      process.env.secretKey
    );
    localStorage.setItem('token', token);
    setAuthorizationToken(token);
    dispatch(setCurrentUser(currentUser));
    resolve();
  });

/**
 * @description - Unauthenticates a user
 *
 * @returns { Object } - Dispatches user object to the store
 */
export const logoutAction = () => (dispatch) => {
  localStorage.removeItem('token');
  setAuthorizationToken(false);
  dispatch({
    type: UNAUTH_USER,
    user: { },
    authenticated: false
  });
  Materialize.toast('Sucessfully logged out...', 1000, 'red');
};


/**
 * @description - Edit profile action
 *
 * @param {Number} userId - User ID
 *
 * @param {Object} userData - User data object
 *
 * @returns { String } - JWT Token
 */
export function editProfileAction(userId, userData) {
  return dispatch => axios.put(`${apiUrl}/edit/${userId}`, userData)
    .then((response) => {
      const user = jwt.decode(response.data.token).currentUser;
      dispatch({
        type: EDIT_PROFILE,
        user
      });
      localStorage.setItem('token', response.data.token);
      Materialize.toast(
        response.data.message,
        1000, 'blue darken-4', () => {
          document.getElementById('edit_profile').reset();
          $('.modal').modal('close');
        }
      );
    })
    .catch(error => notifyNetworkError(error));
}

/**
 * @description - Get users by email action
 *
 * @param { object } email - object containing user email
 *
 * @returns { String } - JWT Token
 */
export function getUserByEmailAction(email) {
  return axios.post(`${searchApiUrl}/email`, email)
    .then(response => response.data.token)
    .catch(error => notifyNetworkError(error));
}
