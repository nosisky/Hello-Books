import axios from 'axios';
import notifyNetworkError from '../utils/notifyNetworkError';

const apiUrl = '/api/v1/users';

/**
 * @description - Check if username exists
 *
 * @param {object} detail - user details
 *
 * @returns {String} - String
 */
export function checkUserExist(detail) {
  return axios
    .post(`${apiUrl}/validate`, detail)
    .then((response) => {
      if (detail.google) {
        return response.data;
      }
      return response.data.message;
    })
    .catch(error => (error.response ?
      error.response.data.message :
      notifyNetworkError(error)));
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
    .post(`${apiUrl}/getemail`, detail)
    .then(response => response.data)
    .catch(error => notifyNetworkError(error));
}
