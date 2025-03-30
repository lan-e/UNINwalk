<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">
          <img v-if="isMobile" alt="logo" src="@/assets/logo-mobile.svg" />
          <img v-else alt="logo" src="@/assets/logo.svg" />
        </RouterLink>
        <div class="navigation">
          <RouterLink to="/">POČETNA</RouterLink>
          <RouterLink to="/unin1">UNIN1</RouterLink>
          <RouterLink to="/unin2">UNIN2</RouterLink>
          <RouterLink to="/unin3">UNIN3</RouterLink>
          <RouterLink to="/about">NASTAVNICI</RouterLink>
          <ToggleTheme />
        </div>
      </nav>
    </div>
  </header>

  <RouterView />

  <RoomModal v-if="roomsStore?.currentRoom && roomsStore.isModalOpen" />
  <Button v-if="roomsStore?.currentRoom" @click="openModal" suffix="Info" class="info-button">
    <template #icon>
      <Icon name="info" />
    </template>
  </Button>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import ToggleTheme from './components/ToggleTheme.vue';
import { useRoomsStore } from './stores/rooms';
import RoomModal from './components/RoomModal.vue';
import Button from './components/UI/Button.vue';
import Icon from './components/UI/Icon.vue';

const roomsStore = useRoomsStore();
const checkIsMobile = () => window.innerWidth < 768;
const isMobile = ref(checkIsMobile());

const updateIsMobile = () => {
  isMobile.value = checkIsMobile();
}

function openModal() {
  roomsStore.openModal();

  const isScrollable = document.documentElement.scrollHeight > window.innerHeight;
  if (isScrollable) {
    document.body.classList.add("has-scroll");
  }
}

onMounted(() => {
  window.addEventListener("resize", updateIsMobile);
})

onUnmounted(() => {
  window.removeEventListener("resize", updateIsMobile);
})
</script>