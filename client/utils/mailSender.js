import axios from 'axios';

const API_URL = '/api/v1/books';


/**
 *
 * @param {Object} data - Object containing mail data
 *
 * @returns {boolean} Boolean - True or False
 */
export default function mailSender(data) {
  return axios.post(`${API_URL}/email`, data)
    .then(response => response.data)
    .catch(error => error.response.data);
}
