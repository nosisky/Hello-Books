import axios from 'axios';
import setAuthorizationToken from '../utils/Authorization';

import configureStore from '../store/index';
import { AUTH_USER,
  AUTH_ERROR,
  UNAUTH_USER } from './types';

const API_URL = 'http://localhost:8000/api/v1/users';

const store = configureStore();


export default function registerUser(userDetails) {
  axios.post(`${API_URL}/signup`, userDetails)
    .then((response) => {
      const token = response.data.Token;
      localStorage.setItem('AUTH_TOKEN', token);
      setAuthorizationToken(token);
      window.location.href = '/dashboard';
      store.dispatch({ type: AUTH_USER });
      return true;
    })
    .catch((error) => error.response.data.message);
}
export function userExist(username) {
  console.log(username);
  axios.post(`${API_URL}/get`, username)
    .then(response => response);
}
