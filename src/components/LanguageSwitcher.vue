<template>
    <div class="language-switch">
        <div v-for="lang in ['en', 'hr']" :key="lang" @click="toggleLanguage(lang)"
            :class="['language-switch-option', { 'active': locale === lang }]">
            <span>{{ lang.toUpperCase() }}</span>
        </div>
    </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";

const { locale } = useI18n();

function toggleLanguage(language) {
    if(locale.value !== language) {
        localStorage.setItem('locale', language)
        return locale.value = language
    }
}
</script>

<style scoped lang="scss">
.language-switch {
    font-size: 13px;

    .language-switch-option {
        cursor: pointer;

        &:hover {
            color: #969696
        }

        &.active {
            cursor: default;
            color: #e30613;

            &:hover {
                color: #e30613
            }
        }
    }
}
</style>