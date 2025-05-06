<template>
  <div v-if="isLoading">
    <LoadingSpinner :message="loadingMessage" />
  </div>
  <template v-else>
    <header>
      <div class="wrapper">
        <nav>
          <RouterLink to="/">
            <img v-if="isMobile" alt="logo" src="@/assets/logo-mobile.svg" />
            <img v-else alt="logo" src="@/assets/logo.svg" />
          </RouterLink>
          <div class="navigation">
            <RouterLink to="/">{{ $t('home') }}</RouterLink>
            <RouterLink to="/unin1">UNIN1</RouterLink>
            <RouterLink to="/unin2">UNIN2</RouterLink>
            <RouterLink to="/unin3">UNIN3</RouterLink>
            <RouterLink to="/about">{{ $t('teachers') }}</RouterLink>
            <ToggleTheme />
            <LanguageSwitcher />
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
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import ToggleTheme from './components/ToggleTheme.vue';
import { useRoomsStore } from './stores/rooms';
import RoomModal from './components/RoomModal.vue';
import Button from './components/UI/Button.vue';
import Icon from './components/UI/Icon.vue';
import LoadingSpinner from './components/UI/LoadingSpinner.vue';
import { initializeChatbot, getInitializationStatus } from './bot/chatbot.js';
import LanguageSwitcher from './components/LanguageSwitcher.vue';

const roomsStore = useRoomsStore();
const checkIsMobile = () => window.innerWidth < 768;
const isMobile = ref(checkIsMobile());
const isLoading = ref(true);
const loadingMessage = ref('Initializing...');

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

async function initializeChatbotWithLoading() {
  try {
    // Start initialization
    const checkStatus = () => {
      const status = getInitializationStatus();
      loadingMessage.value = status.status;
      
      if (status.isInitialized) {
        // Initialization completed successfully
        isLoading.value = false;
        clearInterval(statusInterval);
      } else if (status.error) {
        // Initialization failed
        loadingMessage.value = `Error: ${status.error}`;
        setTimeout(() => {
          isLoading.value = false;
        }, 3000); // Show error for 3 seconds then proceed anyway
        clearInterval(statusInterval);
      }
    };
    
    // Check status every 500ms
    const statusInterval = setInterval(checkStatus, 500);
    
    // Start the initialization process
    await initializeChatbot();
    
  } catch (error) {
    console.error("Failed to initialize:", error);
    loadingMessage.value = "Failed to initialize chatbot";
    // Show error for 3 seconds then proceed anyway
    setTimeout(() => {
      isLoading.value = false;
    }, 3000);
  }
}

onMounted(() => {
  window.addEventListener("resize", updateIsMobile);
  initializeChatbotWithLoading();
})

onUnmounted(() => {
  window.removeEventListener("resize", updateIsMobile);
})
</script>