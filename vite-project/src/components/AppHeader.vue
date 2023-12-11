<script>

</script>

<template>
  <header>
    <nav class="nav">
      <ul>
        <li>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4Q0hUaUi7lLLC5UOslM9ul_B8NyXTKNn9BcBGtCXV&s"
            alt="logo"
          >
        </li>
      </ul>
      <ul>
        <li class="li">
          <RouterLink to="/">
            Home
          </RouterLink>
        </li>
        <li class="li">
          <RouterLink to="/register">
            Register
          </RouterLink>
        </li>
        <li class="li">
          <RouterLink to="/profile">
            User Profile
          </RouterLink>
        </li>
        <li class="li">
          <RouterLink to="/" @click="logout">
            Logout
          </RouterLink>
        </li>
        <li class="li">
          <RouterLink to="/login">
            Login
          </RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
nav {
  padding: 0.25rem 1rem;
  background-color: #42b883;
}

:deep(.li a) {
  color: beige !important;
}



:deep(.li a:hover) {
  color: rgb(218, 64, 18) !important;
}


nav img {
  height: 2rem;
}
</style>
