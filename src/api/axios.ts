import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://cryptopanic.com/api/developer/v2',
  timeout: 5000, // 5 seconds timeout
});

export default apiClient;
