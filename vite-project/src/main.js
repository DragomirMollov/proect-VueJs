import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router/router';
import PrimeVue from 'primevue/config';
import { useUserStore } from './store/useUserStore';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(PrimeVue);

const userStore = useUserStore();
userStore.getPersistedProfile();

app.mount('#app');
