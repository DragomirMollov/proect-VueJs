import { axiosInstance } from "../config/axios";

export async function registerUser(body) {
  try {
    const res = await axiosInstance.post('/user/register', body);
    console.log('registerUser', res.data);
    return res.data;
  } catch (error) {
    console.error('Oops', error);
    return null;
  }
}

export async function loginUser(data) {
  try {
    const res = await axios.post('https://dummyjson.com/auth/login', data);
    return res.data;
  } catch (e) {
    console.log('Oops', e);
    return null;
  }
}
