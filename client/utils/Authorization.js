import axios from 'axios';

const API_URL = '/api/v1/users';

/**
 * setAuthorizationToken - set token to request headers
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

/**
 * Google account creator
 * 
 * @param {Object} userDetails - Object containing user details
 * 
 * @returns {null} - null
 */
export function registerGoogleUser(userDetails) {
  return axios.post(`${API_URL}/signup`, userDetails)
    .then((res) => {
      const token = res.data.Token;
      localStorage.setItem('token', token);
      setAuthorizationToken(token);
      window.location.href = '/dashboard';
    });
}

/**
 * @param {Number} userId - user id
 *
 * @param {Object} userData - Object containing User Data
 *
 * @returns {String} - JWT Token
 */
export function editProfile(userId, userData) {
  return axios.put(`${API_URL}/edit/${userId}`, userData)
    .then(() => axios.get(`${API_URL}/userId`)
      .then(res => res.data.token))
    .catch(error => error.data.response);
}
