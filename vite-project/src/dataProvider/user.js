import { axiosInstance } from "../config/axios";
import { useUserStore } from '../store/useUserStore';

export async function registerUser(body) {
  try {
    console.log('Data sent to the server:', body);
    const res = await axiosInstance.post('/api/user/register', body, {
      headers: { 'Content-Type': 'application/json' },
    });
    const token = res.data.token;
    console.log('Server Response:', res);
    console.log('registerUser', res.data);

    // Set the user profile after registration
    useUserStore.setProfile(res.data, token);

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

    // Use setProfile instead of setToken
    useUserStore.setProfile(response.data, token);

    console.log('Server Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Login Error:', error);
    throw error;
  }
}

export const addRecipe = async (recipe, userId) => {
  try {
    console.log('Recipe before processing:', recipe);

    const response = await axiosInstance.post('/api/recipes/create', {
      ...recipe,
      ingredients: recipe.ingredients.split(',').map(ingredient => ingredient.trim()),
      userId,
    });

    console.log('Recipe created:', response.data);
  } catch (error) {
    console.error('Error creating recipe:', error);
    throw error;
  }
};
