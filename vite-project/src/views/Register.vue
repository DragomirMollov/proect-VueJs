<script setup>
import useValidate from '@vuelidate/core';
import { sameAs, required } from '@vuelidate/validators';
import { computed, reactive } from 'vue';

import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import { createUser } from '../dataProvider/user';

const data = reactive({
    firstName: '',
    lastName: '',
    userName: '',
    password: '',
    repassword: '',
});

const rules = computed(() => ({
    firstName: { required },
    lastName: { required },
    userName: { required },
    password: { required },
    repassword: { required, sameAs: sameAs(data.password) },
}))

const v$ = useValidate(rules, data);

async function onSubmit() {
    const isValid = await v$.value.$validate();
    if(isValid) {
        const hasPassed = await createUser(data);
        console.log('hasPassed?', hasPassed);
    }
}
</script>

<template>
    <form action="" @submit.prevent="onSubmit">
        <h1>Register</h1>
        <InputText type="text" v-model="v$.firstName.$model" placeholder="First Name"/>
        <ul v-if="v$.firstName.$errors.length">
            <li v-for="error in v$.firstName.$errors" :key="error.$uid">
                {{ error.$message }}
            </li>
        </ul>
        <InputText type="text" v-model="v$.lastName.$model" placeholder="Last Name"/>
        <ul v-if="v$.lastName.$errors.length">
            <li v-for="error in v$.lastName.$errors" :key="error.$uid">
                {{ error.$message }}
            </li>
        </ul>
        <InputText type="text" v-model="v$.userName.$model" placeholder="User Name"/>
        <ul v-if="v$.userName.$errors.length">
            <li v-for="error in v$.userName.$errors" :key="error.$uid">
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








<!-- <template>
    <form>

<div class="grid">
    <div class="name">
        <label for="firstname">
            First name
            <input type="text" id="firstname" name="firstname" placeholder="First name" required>
        </label>

        <label for="lastname">
            Last name
            <input type="text" id="lastname" name="lastname" placeholder="Last name" required>
        </label>
    </div>
    <div class="pass">
        <label for="password">
            <input type="password" id="password" name="password" placeholder="Password" aria-label="Password" />
        </label>
        <label for="password">
            <input type="password" id="repassword" name="repassword" placeholder="Repeat Password" aria-label="RePassword" />
        </label>
    </div>

</div>

<label for="email">Email address</label>
<input type="email" id="email" name="email" placeholder="Email address" required>
<small>We'll never share your email with anyone else.</small>

<button type="submit">Submit</button>

</form>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
.grid {
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 1rem;
  }


  .grid > div {
    display: flex;
    gap: 1rem;
    flex: 1;
  }

  .name {
      flex-grow: 1;
      grid-row: 1; /* Take up available space */
  }



  .pass {
    display: inline-block;
    flex-direction: column;
    gap: 1rem;
    flex: 1;
}
</style> -->
