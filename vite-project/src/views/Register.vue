<script setup>
import useValidate from '@vuelidate/core';
import { sameAs, required } from '@vuelidate/validators';
import { reactive, computed } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import { registerUser } from '../dataProvider/user';
import { useUserStore } from '../store/useUserStore';

const router = useRouter();
const userStore = useUserStore();

const data = reactive({
  username: '',
  password: '',
  repassword: '',
});

const rules = computed(() => ({
  username: { required },
  password: { required },
  repassword: { required, sameAs: sameAs(data.password) },
}));

const v$ = useValidate(rules, data);

async function onSubmit() {
  const isValid = await v$.value.$validate();

  if (isValid) {
    console.log('Data sent to server:', data);
    try {
      const registrationResult = await registerUser({
        username: data.username,
        password: data.password,
        repassword: data.repassword,
      });

      if (registrationResult && registrationResult.token) {
        // Registration successful
        userStore.setProfile(registrationResult);
        router.push('/');
      } else {
        // Registration failed
        console.log('Registration failed');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Handle the case where the username already exists
        console.log('Username already exists. Please choose a different one.');
      } else {
        // Handle other registration errors
        console.error('Registration error:', error);
      }
    }
  }
}

</script>

<template>
  <form action="" @submit.prevent="onSubmit">
    <h1>Register</h1>

    <InputText type="text" v-model="v$.username.$model" placeholder="User Name" />
    <ul v-if="v$.username.$errors.length">
      <li v-for="error in v$.username.$errors" :key="error.$uid">
        {{ error.$message }}
      </li>
    </ul>

    <div class="parent">
      <div class="password">
        <Password v-model="v$.password.$model" promptLabel="Choose a password" />
        <ul v-if="v$.password.$errors.length">
          <li v-for="error in v$.password.$errors" :key="error.$uid">
            {{ error.$message }}
          </li>
        </ul>
        <Password v-model="v$.repassword.$model" promptLabel="Repeat a password" />
        <ul v-if="v$.repassword.$errors.length">
          <li v-for="error in v$.repassword.$errors" :key="error.$uid">
            {{ error.$message }}
          </li>
        </ul>
      </div>
    </div>
    <div class="button">
      <Button type="button">Cancel</Button>
      <Button type="submit">Submit</Button>
    </div>
    <RouterLink to="/login">You have an account? Click here...</RouterLink>
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

form >div {
    display: contents;
    gap: 1rem;
    justify-content: center;
}

    
.parent {
    display: flex;
    gap: 1rem;
    flex-grow: 1;
}

.password {
    display: flex;
    gap: 1rem;
    justify-content: center;
}

.button {
    display: flex;
    gap: 1rem;
}
</style>