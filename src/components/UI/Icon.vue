<template>
    <span class="material-symbols-outlined">
        {{ name }}
    </span>
</template>

<script setup>
const props = defineProps(["name"])
</script>