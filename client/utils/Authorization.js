import axios from 'axios';

const API_URL = '/api/v1/users';

/**
 * @description - setAuthorizationToken - set token to request headers
 * 
 * @param  {string} token Authorization token
 * 
 * @return {void} no return or void
 */
export function setAuthorizationToken(token) {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
}

/**
 * @description - Retrieves user data from database
 * 
 * @param {Object} email - Object containing email
 * 
 * @returns {Object} - Object containing user data
 */
export function getUserData(email) {
  return axios.post(`${API_URL}/getemail`, email)
    .then(response => response.data.user)
    .catch(error => error);
}

