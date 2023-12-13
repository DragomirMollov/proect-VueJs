<script setup>
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { RouterLink, useRouter } from 'vue-router';
import { loginUser } from '../dataProvider/user';
import { ref } from 'vue';
import { useUserStore } from '../store/useUserStore';

import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';

const isLoading = ref(false);
const user = ref({
  userName: '',
  password: '',
});

const v$ = useVuelidate({ user: { userName: { required }, password: { required } } });

const userStore = useUserStore();
const router = useRouter();

const onSubmit = async () => {
  if (v$?.value?.$pending) return; // Check if v$ and its properties are defined
  isLoading.value = true;
  const userData = await loginUser(user.value);
  console.log('userData', userData);
  if (userData) {
    userStore.setProfile(userData);
    router.push('/profile');
  }
  isLoading.value = false;
};
</script>

<template>
  <article class="card">
    

    <form @submit.prevent="onSubmit">
        <h1>Login</h1>
      <div>
        <InputText type="text" v-model="user.userName" placeholder="User Name" />
        <span>{{ v$?.user?.userName?.$pending ? 'Validating...' : '' }}</span>
        <span v-if="!v$?.user?.userName?.$pending && v$?.user?.userName?.$error">Username is required</span>
      </div>
      <div>
        <Password v-model="user.password" placeholder="Your a password" />
        <span>{{ v$?.user?.password?.$pending ? 'Validating...' : '' }}</span>
        <span v-if="!v$?.user?.password?.$pending && v$?.user?.password?.$error">Password is required</span>
      </div>
      <Button type="submit" :disabled="v$?.$pending || v$?.$error || isLoading">
        <span v-if="v$?.$pending" class="loader"></span>
        <span v-else>Submit</span>
      </Button>
    <RouterLink to="/register">You don't have an account? Click here...</RouterLink>

    </form>
  </article>
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