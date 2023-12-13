import { axiosInstance } from "../config/axios";

export async function registerUser(body) {
  try {

    console.log('Data sent to server:', body);
    const res = await axiosInstance.post('/api/user/register', body, {
      headers: { 'Content-Type': 'application/json' },
    });
    console.log('Server Response:', res);
    console.log('registerUser', res.data);
    return res.data;
  } catch (error) {
    console.error('Oops', error);
    return null;
  }
}


// Example client login logic
export async function loginUser(credentials) {
  try {
    const response = await axiosInstance.post('/api/user/login', credentials);
    const token = response.data.token;
    userStore.setToken(token);

    console.log('Server Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Login Error:', error);
    throw error;
  }
}

