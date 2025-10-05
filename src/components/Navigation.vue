<template>
  <nav>
    <RouterLink to="/">
      <img v-if="isMobile" alt="logo" src="@/assets/logo-mobile.svg" />
      <img v-else-if="locale === 'en'" src="@/assets/logo-en.svg" alt="" />
      <img v-else alt="logo" src="@/assets/logo.svg" />
    </RouterLink>
    <div class="navigation">
      <RouterLink to="/">{{ $t("home") }}</RouterLink>
      <div v-if="isMobile">
        <div class="dropdown">
          <button class="dropdown-button" @click="emit('toggleDropdown')">
            UNIN
            <Icon name="arrow_drop_down" style="font-size: 12px" />
          </button>
          <div class="dropdown-content" v-show="showDropdown">
            <RouterLink to="/unin1" @click="showDropdown = false">
              UNIN1
            </RouterLink>
            <RouterLink to="/unin2" @click="showDropdown = false">
              UNIN2
            </RouterLink>
            <RouterLink to="/unin3" @click="showDropdown = false">
              UNIN3
            </RouterLink>
          </div>
        </div>
      </div>
      <template v-else>
        <RouterLink to="/unin1">UNIN1</RouterLink>
        <RouterLink to="/unin2">UNIN2</RouterLink>
        <RouterLink to="/unin3">UNIN3</RouterLink>
      </template>
      <RouterLink to="/professors">{{ $t("professors") }}</RouterLink>

      <!-- Settings dropdown -->
      <div class="dropdown">
        <button class="dropdown-button" @click="emit('toggleSettingsDropdown')">
          <Icon name="settings" style="font-size: 20px" />
        </button>
        <div class="dropdown-content settings" v-show="showSettingsDropdown">
          <ToggleTheme />
          <hr />
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import ToggleTheme from "./ToggleTheme.vue";
import LanguageSwitcher from "./LanguageSwitcher.vue";
import Icon from "./UI/Icon.vue";
import { RouterLink } from "vue-router";

defineProps(["isMobile", "showDropdown", "showSettingsDropdown"]);
const emit = defineEmits(["toggleDropdown", "toggleSettingsDropdown"]);
const { locale } = useI18n();
</script>
