<template>
  <header>
    <div class="wrapper">
      <nav class="navigation">
        <RouterLink to="/">
          <img v-if="isMobile" alt="logo" src="@/assets/logo-mobile.svg" />
          <img v-else alt="logo" src="@/assets/logo.svg" />
        </RouterLink>
        <div class="navigation-pages">
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

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router'

const checkIsMobile = () => window.innerWidth < 768

const isMobile = ref(checkIsMobile())

const updateIsMobile = () => {
  isMobile.value = checkIsMobile()
}

onMounted(() => {
  window.addEventListener('resize', updateIsMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateIsMobile)
})
</script>

<style scoped>
nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  font-size: 16px;
  margin: 16px;

  .navigation-pages {
    display: flex;
    gap: 24px;

    a {
      color: #535252;
      text-decoration: none;
      transition: all 0.2s ease-in-out;

      &:hover {
        color: #969696;
      }

      &.router-link-exact-active {
        color: #E30613;

        &:hover {
          color: #E30613;
          cursor: default;
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  nav .navigation-pages {
    gap: 10px;

    a {
      font-size: 12px;
    }
  }
}
</style>
