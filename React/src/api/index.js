import axios from 'axios';

export const API_ADDRESS = 'https://guitar-scales-api.theflashofsonic.now.sh/api/';
//export const API_ADDRESS = 'http://localhost:3000/api/';
const axiosInstance = axios.create({
  baseURL: API_ADDRESS,
  timeout: 3000,
  headers: {},
});

export default axiosInstance;