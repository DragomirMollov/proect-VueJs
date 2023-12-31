import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      isAuthenticated: false,
      profile: null,
      favouritesRecipes: [],
      recipesInfo: {},
      token: null,
    };
  },
  actions: {
    setProfile(data) {
      this.profile = data;
      this.token = data.token;
      this.isAuthenticated = true;
      sessionStorage.setItem('user', JSON.stringify(data));
    },
    addFavoriteRecipes(id) {
      this.favouritesRecipes.push(id);
    },
    removeFavoriteRecipes(id) {
      this.favouritesRecipes = this.favouritesRecipes.filter(recipes => recipes !== id);
    },
    getPersistedProfile() {
      const persisted = sessionStorage.getItem('user');
      if (!persisted) return;
      this.profile = JSON.parse(persisted);
      this.isAuthenticated = true;
    },
    logout() {
      this.isAuthenticated = false;
      this.profile = null;
      sessionStorage.removeItem('user');
    },
    setRecipesInfo(recipesInfo) {
      this.recipesInfo = recipesInfo;
      console.log(recipesInfo);
    },
    getUserId() {
      return this.profile ? this.profile.userId : null;
    },
    getToken() {
      return this.token;
    },
  },
});
