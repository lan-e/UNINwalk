<template>
    <Login v-if="!userEmail" @login-success="handleLoginSuccess" />
    <div v-else @click="handleClickOutsideRoom">
      <header>
        <div class="wrapper">
          <nav>
            <RouterLink to="/">
              <img v-if="isMobile" alt="logo" src="@/assets/logo-mobile.svg" />
              <img v-else-if="locale === 'en'" src="@/assets/logo-en.svg" alt="">
              <img v-else alt="logo" src="@/assets/logo.svg" />
            </RouterLink>
            <div class="navigation">
              <RouterLink to="/">{{ $t('home') }}</RouterLink>
              <div v-if="isMobile">
                <div class="dropdown">
                  <button class="dropdown-button" @click="toggleDropdown">
                    UNIN
                    <Icon name="arrow_drop_down" style="font-size:12px" />
                  </button>
                  <div class="dropdown-content" v-show="showDropdown">
                    <RouterLink to="/unin1" @click="showDropdown = false">UNIN1</RouterLink>
                    <RouterLink to="/unin2" @click="showDropdown = false">UNIN2</RouterLink>
                    <RouterLink to="/unin3" @click="showDropdown = false">UNIN3</RouterLink>
                  </div>
                </div>
              </div>
              <template v-else>
                <RouterLink to="/unin1">UNIN1</RouterLink>
                <RouterLink to="/unin2">UNIN2</RouterLink>
                <RouterLink to="/unin3">UNIN3</RouterLink>
              </template>
              <RouterLink to="/professors">{{ $t('professors') }}</RouterLink>
              
              <!-- Settings dropdown -->
              <div class="dropdown">
                <button class="dropdown-button" @click="toggleSettingsDropdown">
                  <Icon name="settings" style="font-size:20px" />
                </button>
                <div class="dropdown-content settings" v-show="showSettingsDropdown">
                  <span class="user-profile">
                    <span class="user-email">{{ userEmail }}</span>
                    <Icon @click="logout" name="logout" style="font-size:18px;cursor: pointer;"/>
                  </span>
                  <hr />
                  <ToggleTheme />
                  <hr />
                  <LanguageSwitcher />
                </div>
              </div>
            </div>
          </nav>
        </div>
      </header>

      <RouterView :isLoading="isLoading" :loadingMessage="loadingMessage" />

      <RoomModal v-if="roomsStore?.currentRoom && roomsStore.isModalOpen" />
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import ToggleTheme from './components/ToggleTheme.vue';
import { useRoomsStore } from './stores/rooms';
import RoomModal from './components/RoomModal.vue';
import Icon from './components/UI/Icon.vue';
import { initializeChatbot, getInitializationStatus } from './bot/chatbot.js';
import LanguageSwitcher from './components/LanguageSwitcher.vue';
import { useI18n } from 'vue-i18n';
import Login from './components/Login.vue';

const { t, locale } = useI18n();
const roomsStore = useRoomsStore();
const checkIsMobile = () => window.innerWidth < 768;
const isMobile = ref(checkIsMobile());
const isLoading = ref(true);
const loadingMessage = ref(t('initializing_llm_message'));
const showDropdown = ref(false);
const showSettingsDropdown = ref(false);

// Make userEmail reactive - this will control app access
const userEmail = ref(localStorage.getItem('userEmail'));

// Function to check localStorage and update reactive state
const checkLoginStatus = () => {
  const storedUserEmail = localStorage.getItem('userEmail');
  if (storedUserEmail !== userEmail.value) {
    userEmail.value = storedUserEmail;
  }
};

// Handle successful login from Login component
const handleLoginSuccess = (email) => {
  localStorage.setItem('userEmail', email);
  userEmail.value = email;
};

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
  const dropdownButtons = document.querySelectorAll('.dropdown-button');
  const dropdownContents = document.querySelectorAll('.dropdown-content');

  const clickedInsideDropdown = [...dropdownButtons, ...dropdownContents].some(el =>
    el.contains(event.target)
  );

  if (!clickedInsideDropdown) {
    showDropdown.value = false;
    showSettingsDropdown.value = false;
  }
};

function logout() {
  localStorage.removeItem('userEmail');
  userEmail.value = null;
  showDropdown.value = false;
  showSettingsDropdown.value = false;
}

const updateIsMobile = () => {
  isMobile.value = checkIsMobile();
}

const handleClickOutsideRoom = (event) => {
  if (roomsStore?.currentRoom) {
    // check if the click was on a room, modal or modal overlay
    const isRoomClick = event.target.closest('[id^="room-"]');
    const isModalClick = event.target.closest('.modal');
    const isModalOverlayClick = event.target.closest('.overlay');
    
    // deselect room if click is outside room, modal, and modal overlay
    if (!isRoomClick && !isModalClick && !isModalOverlayClick) {
      roomsStore.deselectRoom();
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

// Listen for storage changes (useful if user logs in/out in another tab)
const handleStorageChange = (event) => {
  if (event.key === 'userEmail') {
    userEmail.value = event.newValue;
  }
};

onMounted(() => {
  window.addEventListener("resize", updateIsMobile);
  window.addEventListener('storage', handleStorageChange); // Listen for localStorage changes
  document.addEventListener('click', closeDropdownOnClickOutside);
  
  // Initialize login status
  checkLoginStatus();
  
  // Only initialize chatbot if user is logged in
  if (userEmail.value) {
    initializeChatbotWithLoading();
  } else {
    isLoading.value = false; // Skip loading if not logged in
  }
});

onUnmounted(() => {
  window.removeEventListener("resize", updateIsMobile);
  window.removeEventListener('storage', handleStorageChange);
  document.removeEventListener('click', closeDropdownOnClickOutside);
});

// Watch for login state changes to initialize chatbot when user logs in
watch(userEmail, (newValue, oldValue) => {
  if (newValue && !oldValue) {
    // User just logged in, initialize chatbot
    isLoading.value = true;
    initializeChatbotWithLoading();
  }
});
</script>