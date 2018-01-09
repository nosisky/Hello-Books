import axios from 'axios';

const apiUrl = '/api/v1/books';


/**
 *
 * @param {Object} data - Object containing mail data
 *
 * @returns {boolean} Boolean - True or False
 */
export default function mailSender(data) {
const apiUrl = '/api/v1/books';
  return axios.post(`${apiUrl}/email`, data)
    .then(response => response.data)
    .catch(error => error.response.data);
}
