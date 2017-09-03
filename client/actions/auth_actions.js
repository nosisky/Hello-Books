import axios from 'axios';
import jwt from 'jsonwebtoken';

import { setAuthorizationToken } from '../utils/Authorization';

import configureStore from '../store/index';
import { SET_CURRENT_USER, UNAUTH_USER } from './types';

const API_URL = 'http://localhost:8000/api/v1/users';

export function registerUser(userDetails) {
  return (dispatch) => axios.post(`${API_URL}/signup`, userDetails).then((res) => {
    console.log(res.data);
    const token = res.data.Token;
    localStorage.setItem('token', token);
    setAuthorizationToken(token);
    dispatch({
      type: SET_CURRENT_USER,
      user: jwt.decode(res.data.Token)
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
        user: decoded.currentUser
      });
    });
}

export function logout() {
  return (dispatch) => {
    localStorage.removeItem('token');
    setAuthorizationToken(false);
    dispatch({
      type: UNAUTH_USER,
      user: {}
    });
    window.location.href = '/';
  };
}
