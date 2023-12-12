import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import FavoriteRecipes from '../views/FavoriteRecipes.vue';
import UserProfile from '../views/UserProfile.vue';
import { useUserStore } from '../store/useUserStore';

const validateUser = ()=> {
    const userStore = useUserStore();
    return userStore.isAuthenticated ? userStore.isAuthenticated : { path: '/login' }
}

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Home },
        { path: '/favorites', component: FavoriteRecipes, beforeEnter: validateUser },
        { path: '/profile', component: UserProfile, beforeEnter: validateUser },
        { path: '/register', component: Register },
        { path: '/login', component: Login, beforeEnter: () => {
            const userStore = useUserStore();
            return userStore.isAuthenticated ? { path: '/profile' } : true;
        }},
    ]
  });

  export default router