import axios from 'axios';

const API_URL = '/api/v1/users';

/**
 * 
 * @description - Check if username exists
 * 
 * @param {object} detail - user details 
 *
 * @returns {String} - String
 */
export function checkUserExist(detail) {
  return axios
    .post(`${API_URL}/get`, detail)
    .then(response => response.data.message)
    .catch(error => error.response.data.message);
}

/**
 * 
 * @description - Check if email exists
 * 
 * @param {object} detail - User email
 *
 * @returns {String} - String
 */
export function checkEmailExist(detail) {
  return axios
    .post(`${API_URL}/getemail`, detail)
    .then(response => response.data)
    .catch((error) => Materialize.toast(error.response.data.message, 
      '1000', 'red'));
}
