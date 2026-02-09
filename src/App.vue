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

    <RouterView />

    <RoomModal v-if="roomsStore?.currentRoom && roomsStore.isModalOpen" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, provide } from "vue";
import { RouterView, useRouter } from "vue-router";
import { useRoomsStore } from "./stores/rooms";
import RoomModal from "./components/RoomModal.vue";
import { useI18n } from "vue-i18n";
import Navigation from "./components/Navigation.vue";
import { fetchProfessorsData, fetchRoomsData, fetchUninData } from "./apiCalls";
import { useGeneralStore } from "./stores/general_store";

const { t } = useI18n();
const roomsStore = useRoomsStore();
const checkIsMobile = () => window.innerWidth < 768;
const isMobile = ref(checkIsMobile());
const isLoading = ref(true);
const loadingMessage = ref(t("initializing_llm_message"));
const showDropdown = ref(false);
const showSettingsDropdown = ref(false);
const router = useRouter();
const generalStore = useGeneralStore();

provide("chatbot_loading", {
  isLoading,
  loadingMessage,
});

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
    (el) => el.contains(event.target),
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

onMounted(async () => {
  roomsStore.rooms = await fetchRoomsData();
  generalStore.professors = await fetchProfessorsData();
  generalStore.uninData = await fetchUninData();
  window.addEventListener("resize", updateIsMobile);
  document.addEventListener("click", closeDropdownOnClickOutside);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateIsMobile);
  document.removeEventListener("click", closeDropdownOnClickOutside);
});
</script>
