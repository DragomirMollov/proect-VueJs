import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import FavoriteRecipes from '../views/FavoriteRecipes.vue';
import UserProfile from '../views/UserProfile.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Home},
        { path: '/favorites', component: FavoriteRecipes},
        { path: '/profile', component: UserProfile},
        { path: '/register', component: Register},
        { path: '/login', component: Login},
    ]
  });

  export default router