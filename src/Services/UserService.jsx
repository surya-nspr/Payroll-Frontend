import axios from 'axios';

const BASE_REST_API_URL = 'http://localhost:8080/api/authenticate/';

class UserService {
  login(username, password) {
    const url = BASE_REST_API_URL + 'login';
    console.log('Logging in at URL:', url);
    return axios.post(url, { username, password });
  }

  setAuthHeader(token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

}

export default new UserService();
