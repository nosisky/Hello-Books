import axios from 'axios';

const API_URL = '/api/v1/notification';


/**
 *
 * @returns {Object} - Object containing notifications
 */
export default function Notifications() {
  return axios.get(API_URL)
    .then(response => response.data)
    .catch(error => error.response.data);
}
