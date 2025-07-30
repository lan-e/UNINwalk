<template>
    <div class="loading-spinner">
        <div class="spinner"></div>
        <p class="message">{{ message }}</p>
    </div>
</template>

<script setup>
defineProps({
  message: {
    type: String,
    default: 'Loading...'
  }
});
</script>

<style scoped>
.loading-spinner {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.spinner {
    animation: spin 1s linear infinite;
    border-radius: 50%;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #e30613;
    height: 3rem;
    width: 3rem;
    margin-bottom: 1rem;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>