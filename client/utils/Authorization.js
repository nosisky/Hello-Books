import axios from 'axios';


/**
 * setAuthorizationToken - set token to request headers
 * @param  {string} token Authorization token
 * @return {void} no return or void
 */
export default function setAuthorizationToken(token) {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
}
