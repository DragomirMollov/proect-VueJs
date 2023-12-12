import axios from 'axios';
export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_API,
    // timeout: 1000,
    // headers: {'X-Custom-Header': 'foobar'}
  });

  