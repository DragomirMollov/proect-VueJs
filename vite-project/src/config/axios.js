import axios from 'axios';
import { useUserStore } from '../store/useUserStore';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API,
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const userStore = useUserStore();
    const token = userStore.getToken(); // Assuming you have a getToken method in your store
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
