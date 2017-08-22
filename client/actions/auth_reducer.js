import axios from 'axios';
import setAuthorizationToken from '../utils/Authorization';

import configureStore from '../store/index';
import { AUTH_USER,
  AUTH_ERROR,
  UNAUTH_USER } from './types';

const store = configureStore();


const API_URL = 'http://localhost:8000/api/v1/users';

export function errorHandler(dispatch, error, type) {
  let errorMessage = '';

  if (error.data.error) {
    errorMessage = error.data.message;
  } else if (error.data) {
    errorMessage = error.data.message;
  } else {
    errorMessage = error;
  }

  if (error.status === 401) {
    dispatch({
      type,
      payload: 'You are not authorized to do this. Please login and try again.'
    });
    logoutUser();
  } else {
    dispatch({
      type,
      payload: errorMessage
    });
  }
}

export function loginUser({ email, password }) {
  return (dispatch) => {
    axios.post(`${API_URL}/signin`, { email, password })
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem('AUTH_TOKEN', token);
        setAuthorizationToken(token);
        dispatch({ type: AUTH_USER });
        window.location.href = `${API_URL}/dashboard`;
      })
      .catch((error) => {
        console.log(error);
        errorHandler(dispatch, error.response, AUTH_ERROR);
      });
  };
}

export function registerUser(userDetails) {
  console.log(API_URL);
  return function dispatch() {
    axios.post(`${API_URL}/signup`, userDetails)
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem('AUTH_TOKEN', token);
        setAuthorizationToken(token);
        window.location.href = `${API_URL}/dashboard`;
      })
      .catch((error) => {
        errorHandler(dispatch, error.response.data.message, AUTH_ERROR);
      });
    dispatch({ type: AUTH_USER });

  };
}

export function logoutUser() {
  return (dispatch) => {
    localStorage.removeItem('AUTH_TOKEN');
    setAuthorizationToken(false);
    dispatch({ type: UNAUTH_USER });
    window.location.href = `${API_URL}/signin`;
  };
}
