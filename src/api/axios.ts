import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://cryptopanic.com/api/developer/v2', // correct base URL
  timeout: 5000, // 5 seconds timeout is valid
});

export default apiClient;
