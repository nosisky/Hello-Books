import axios from 'axios';

const API_URL = '/api/v1/books';


export default function MailSender(data) {
  return axios.post(`${API_URL}/email`, data)
    .then(response => response.data)
    .catch(error => error.response.data);
}
