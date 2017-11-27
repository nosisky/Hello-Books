import axios from 'axios';

const API_URL = '/api/v1/users';

/**
 * 
 * Check if username exists
 * @param {object} detail 
 * @returns {String} - String
 */

export function checkUserExist(detail) {
  return axios
    .post(`${API_URL}/get`, detail)
    .then(response => response.data.message)
    .catch(error => error);
}

/**
 * 
 * Check if email exists
 * @param {object} detail 
 * @returns {String} - String
 */

export function checkEmailExist(detail) {
  return axios
    .post(`${API_URL}/getemail`, detail)
    .then(response => response.data.message)
    .catch(() => false);
}
