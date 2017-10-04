import axios from 'axios';
import jwt from 'jsonwebtoken';

import { setAuthorizationToken } from '../utils/Authorization';

import { SET_CURRENT_USER, UNAUTH_USER } from './types';

const API_URL = 'https://andela-hellobooks.herokuapp.com/api/v1/users';

const SEARCH_API_URL = 'https://andela-hellobooks.herokuapp.com/api/v1/search';

export function registerUser(userDetails) {
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

export function login(userDetails) {
  return dispatch =>
    axios.post(`${API_URL}/signin`, userDetails).then((res) => {
      const token = res.data.Token;
      localStorage.setItem('token', token);
      setAuthorizationToken(token);
      const decoded = jwt.decode(res.data.Token);
      dispatch({
        type: SET_CURRENT_USER,
        user: decoded.currentUser,
        authenticated: true
      });
    });
}

export function logout() {
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

export function editProfile(userId, userData) {
  return axios.put(`${API_URL}/edit/${userId}`, userData)
    .then(() => axios.get(`${SEARCH_API_URL}/${userId}`)
      .then(res => res.data.token))
    .catch(error => error.data.response);
}

export function getUserByEmail(email) {
  return axios.post(`${SEARCH_API_URL}/email`, email)
    .then(res => res.data.token)
    .catch(error => error.data.response);
}
