<template>
    <div class="language-toggle">
        <button @click="toggleLanguage" class="language-toggle-button">
            <span :class="{ 'active': locale === 'en' }">EN</span>
            <span :class="{ 'active': locale === 'hr' }">HR</span>
        </button>
    </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";

const { locale } = useI18n();

function toggleLanguage() {
    locale.value = locale.value === 'en' ? 'hr' : 'en';
    localStorage.setItem('locale', locale.value);
}
</script>

<style scoped lang="scss">
.language-toggle-button {
    background: none;
    border: none;
    display: flex;
    gap: 4px;
    cursor: pointer;
    padding: 8px;
    border-radius: 4px;
    color: var(--color-text);
    font-size: 16px;

    &:hover {
        background-color: var(--color-background-mute);
    }

    span {
        &.active {
            color: #e30613;
        }
    }
}
</style>