<template>
    <button :class="['button', variant]">
        <slot name="icon" />
        {{ suffix }}
    </button>
</template>

<script setup>
const props = defineProps(['suffix', 'variant'])
</script>

<style lang="scss">
.button {
    border: none;
    background: #E30613;
    color: #fff;
    border-radius: 8px;
    padding: 4px 8px;
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 600;
    font-size: 16px;
    cursor: pointer;

    &.icon {
        position: absolute;
        top: 8px;
        right: 8px;
        background: none;
        color: #4d4d4d;
        padding: 4px;
        font-size: 10px;

        &:hover {
            background: rgba(241, 241, 241, 0.507);
            transition: 0.2s all ease-in-out;
        }
    }
}
</style>