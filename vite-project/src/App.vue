<script>
import { RouterView } from 'vue-router';
import AppHeader from './components/AppHeader.vue';

export default {
  components: {
    AppHeader,
    RouterView,
  },
  data() {
    return {

    };
  },
};
</script>

<template>
  <div class="app-container">
  <AppHeader />
  <main>
    <RouterView />
  </main>
  <footer class="footer">
      &copy; 2023 Recipe Sharing Platform
    </footer>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: 0;
}
.footer {
  background-color: #42b883;
  color: white;
  text-align: center;
  padding: 0.5rem;
}

main {
  flex-grow: 1;
  padding: 1rem;
}
</style>
