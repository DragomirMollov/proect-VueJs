import { axiosInstance } from "../config/axios"


export async function createUser(body) {
    try {
        const res = await axiosInstance.post('/user/add', body);
        console.log('createUser', res.data);
        return res.data;
    } catch (error) {
        console.error('Oops', error);
        return null;
    }
};

export async function getUser(id) {
    try {
        const res = await axiosInstance.get(`https://dummyjson.com/users/${id}`);
        console.log('getUser',res.data);
        return res.data;
    } catch (error) {
        console.error('Oops', error);
        return null;
    }
};

export async function loginUser(data) {
    try {
        const res = await axios.post('https://dummyjson.com/auth/login', data)
        return res.data;
    } catch (e) {
        console.log('Oops', e);
        return null;
    }
}