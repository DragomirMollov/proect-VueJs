<script setup>
  import { ref } from 'vue';
  import { useUserStore } from '../store/useUserStore';
  import { addRecipe } from '../dataProvider/user';  // Correct the import path
  import InputText from 'primevue/inputtext';
  import Button from 'primevue/button';

  const userStore = useUserStore();
  const recipe = ref({
    title: '',
    description: '',
    ingredients: '',
    instructions: '',
  });

  const handleAddRecipe = async () => {
  try {
    // Wait for the user profile to be available
    await useUserStore.getPersistedProfile();
    
    const userId = useUserStore.getUserId();
    
    if (!userId) {
      console.error('User ID is undefined');
      return;
    }

    const ingredientsArray = typeof recipe.value.ingredients === 'string'
      ? recipe.value.ingredients.split(',').map(ingredient => ingredient.trim())
      : [];

    await addRecipe({
      ...recipe.value,
      ingredients: ingredientsArray,
      userId,
    });
  } catch (error) {
    console.error('Error adding recipe:', error);
  }
};


</script>

<template>
  <form @submit.prevent="handleAddRecipe">
    <label for="title">Title:</label>
    <InputText v-model="recipe.title" required />

    <label for="description">Description:</label>
    <InputText v-model="recipe.description" required />

    <label for="ingredients">Ingredients:</label>
    <InputText v-model="recipe.ingredients" required />

    <label for="instructions">Instructions:</label>
    <InputText v-model="recipe.instructions" required />

    <Button type="submit">Add Recipe</Button>
  </form>
</template>

<style scoped>
form {
  display: grid;
  gap: 1rem;
  max-width: 600px;
  margin: 4rem auto;
  border-radius: 1rem;
  padding: 1.5rem 0.75rem;
  border: 1px solid #58b5d4;
}
</style>
