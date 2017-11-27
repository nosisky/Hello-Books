import axios from 'axios';

const API_URL = '/api/v1/users';
/**
 * setAuthorizationToken - set token to request headers
 * @param  {string} token Authorization token
 * @return {void} no return or void
 */
export function setAuthorizationToken(token) {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
}

export function getUserData(email) {
  return axios.post(`${API_URL}/getemail`, email)
    .then(response => response.data.user)
    .catch(error => error);
}

export function registerGoogleUser(userDetails) {
  return axios.post(`${API_URL}/signup`, userDetails)
    .then((res) => {
      const token = res.data.Token;
      localStorage.setItem('token', token);
      setAuthorizationToken(token);
      window.location.href = '/dashboard';
    });
}

export function editProfile(userId, userData) {
  return axios.put(`${API_URL}/edit/${userId}`, userData)
    .then(() => axios.get(`${API_URL}/userId`)
      .then(res => res.data.token))
    .catch(error => error.data.response);
}
