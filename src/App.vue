<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav class="navigation">
        <RouterLink to="/">
          <img alt="Vue logo" class="logo" src="@/assets/UNINlogo.svg" />
        </RouterLink>
        <div>
          <RouterLink to="/">POČETNA</RouterLink>
          <RouterLink to="/unin1">UNIN1</RouterLink>
          <RouterLink to="/unin2">UNIN2</RouterLink>
          <RouterLink to="/unin3">UNIN3</RouterLink>
          <RouterLink to="/about">NASTAVNICI</RouterLink>
        </div>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
* {
  font-family: "Roboto", serif;
  font-optical-sizing: auto;
}

nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
  font-size: 16px;
  text-align: center;
  margin: 16px 0;

  a {
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);
    color: #535252;
    text-decoration: none;
    transition: all 0.2s ease-in-out;

    &.router-link-exact-active {
      color: #E30613;
    }

    &:hover {
      color: #969696;
    }
  }
}

.logo {
  display: flex;
}

@media screen and (max-width: 660px) {
  nav a {
    padding: 0 4px;
    font-size: 12px;
  }

  .logo {
    width: 130px;
  }
}
</style>
