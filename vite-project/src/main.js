import { createApp } from 'vue';
import { createPinia } from 'pinia';
// import './styles/reset.css';
import App from './App.vue';
import router from './router/router';
import PrimeVue from 'primevue/config';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(PrimeVue);

app.mount('#app');