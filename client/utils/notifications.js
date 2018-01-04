import axios from 'axios';

import notifyNetworkError from '../actions/notifyNetworkError';

const API_URL = '/api/v1/notification';


/**
 * @description - Fetches all notifications from the database
 *
 * @returns {Object} - Object containing notifications
 */
export default function notifications() {
  return axios.get(API_URL)
    .then(response => response.data)
    .catch(error => notifyNetworkError(error));
}
