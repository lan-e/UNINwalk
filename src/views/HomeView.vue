<template>
  <div class="home-container">
    <UninAll />
    <Chatbot :isLoading="isLoading" :loadingMessage="loadingMessage" />
  </div>
</template>

<script setup>
import Chatbot from '@/components/Chatbot.vue';
import UninAll from '@/components/UninAll.vue';

const props = defineProps({
    isLoading: {
        type: Boolean
    },
    loadingMessage: {
        type: String
    }
})
</script>

<style>
.home-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 48px;
  padding: 32px;
  padding-top: 0;
}

@media (max-width: 768px) {
  .home-container {
    flex-direction: column;
  }
}
</style>