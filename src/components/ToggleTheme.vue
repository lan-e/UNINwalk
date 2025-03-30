<template>
    <button @click="toggleTheme" class="theme-toggle">
        <Icon v-if="isDarkTheme" name="light_mode" />
        <Icon v-else name="dark_mode" />
    </button>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import Icon from './UI/Icon.vue';

const isDarkTheme = ref(false);

// Initialize theme based on saved preference or system preference
function initializeTheme() {
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme === 'dark') {
    applyDarkTheme();
  } else if (savedTheme === 'light') {
    applyLightTheme();
  } else {
    applySystemTheme();
  }
}

// Apply theme based on system preference
function applySystemTheme() {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (prefersDark) {
    applyDarkTheme();
  } else {
    applyLightTheme();
  }
  
  // Remove any saved preference
  localStorage.removeItem('theme');
}

// Apply dark theme
function applyDarkTheme() {
  document.documentElement.classList.remove('light-theme');
  document.documentElement.classList.add('dark-theme');
  isDarkTheme.value = true;
}

// Apply light theme
function applyLightTheme() {
  document.documentElement.classList.remove('dark-theme');
  document.documentElement.classList.add('light-theme');
  isDarkTheme.value = false;
}

// Toggle between light and dark themes
function toggleTheme() {
  if (isDarkTheme.value) {
    applyLightTheme();
    localStorage.setItem('theme', 'light');
  } else {
    applyDarkTheme();
    localStorage.setItem('theme', 'dark');
  }
}

function handleSystemThemeChange(event) {
  // Only adjust theme if no user preference is saved
  if (!localStorage.getItem('theme')) {
    if (event.matches) {
      applyDarkTheme();
    } else {
      applyLightTheme();
    }
  }
}

// Initialize theme when component mounts
onMounted(() => {
  initializeTheme();
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', handleSystemThemeChange);
});

onBeforeUnmount(() => {
  window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', handleSystemThemeChange);
});
</script>