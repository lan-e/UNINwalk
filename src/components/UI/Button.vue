<template>
    <button :class="['button', variant]">
        <slot name="icon" />
        {{ suffix }}
    </button>
</template>

<script setup>
const props = defineProps(['suffix', 'variant'])
</script>