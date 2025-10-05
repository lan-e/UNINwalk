<template>
  <div @click="handleClickOutsideRoom">
    <header>
      <div class="wrapper">
        <Navigation
          :isMobile="isMobile"
          :showDropdown="showDropdown"
          :showSettingsDropdown="showSettingsDropdown"
          @toggleDropdown="toggleDropdown"
          @toggleSettingsDropdown="toggleSettingsDropdown"
        />
      </div>
    </header>

    <RouterView :isLoading="isLoading" :loadingMessage="loadingMessage" />

    <RoomModal v-if="roomsStore?.currentRoom && roomsStore.isModalOpen" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import { RouterView, useRouter } from "vue-router";
import { useRoomsStore } from "./stores/rooms";
import RoomModal from "./components/RoomModal.vue";
import { initializeChatbot, getInitializationStatus } from "./bot/chatbot.js";
import { useI18n } from "vue-i18n";
import Navigation from "./components/Navigation.vue";

const { t } = useI18n();
const roomsStore = useRoomsStore();
const checkIsMobile = () => window.innerWidth < 768;
const isMobile = ref(checkIsMobile());
const isLoading = ref(true);
const loadingMessage = ref(t("initializing_llm_message"));
const showDropdown = ref(false);
const showSettingsDropdown = ref(false);
const router = useRouter();

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
  if (showDropdown.value) {
    showSettingsDropdown.value = false;
  }
};

const toggleSettingsDropdown = () => {
  showSettingsDropdown.value = !showSettingsDropdown.value;
  if (showSettingsDropdown.value) {
    showDropdown.value = false;
  }
};

const closeDropdownOnClickOutside = (event) => {
  const dropdownButtons = document.querySelectorAll(".dropdown-button");
  const dropdownContents = document.querySelectorAll(".dropdown-content");

  const clickedInsideDropdown = [...dropdownButtons, ...dropdownContents].some(
    (el) => el.contains(event.target)
  );

  if (!clickedInsideDropdown) {
    showDropdown.value = false;
    showSettingsDropdown.value = false;
  }
};

const updateIsMobile = () => {
  isMobile.value = checkIsMobile();
};

const handleClickOutsideRoom = (event) => {
  if (roomsStore?.currentRoom) {
    // check if the click was on a room, modal or modal overlay
    const isRoomClick = event.target.closest('[id^="room-"]');
    const isModalClick = event.target.closest(".modal");
    const isModalOverlayClick = event.target.closest(".overlay");

    // deselect room if click is outside room, modal, and modal overlay
    if (!isRoomClick && !isModalClick && !isModalOverlayClick) {
      roomsStore.deselectRoom();
      router.push({ query: null });
      roomsStore.closeModal();
    }
  }
};

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
    await initializeChatbot(t);
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
  document.addEventListener("click", closeDropdownOnClickOutside);
  initializeChatbotWithLoading();
});

onUnmounted(() => {
  window.removeEventListener("resize", updateIsMobile);
  document.removeEventListener("click", closeDropdownOnClickOutside);
});
</script>
