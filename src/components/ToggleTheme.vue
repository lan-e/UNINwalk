<template>
    <div class="theme-toggle">
        <button @click="toggleTheme" class="theme-toggle-button">
            <Icon name="light_mode" :class="{ 'active': !isDarkTheme }" style="font-size:18px" />
            <Icon name="dark_mode" :class="{ 'active': isDarkTheme }" style="font-size:18px" />
        </button>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Icon from './UI/Icon.vue';

const isDarkTheme = ref(false);

function applyTheme(dark) {
    document.documentElement.className = dark ? 'dark-theme' : 'light-theme';
    isDarkTheme.value = dark;
}

function toggleTheme() {
    const newTheme = !isDarkTheme.value;
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
}

onMounted(() => {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(saved === 'dark' || (!saved && prefersDark));
});
</script>