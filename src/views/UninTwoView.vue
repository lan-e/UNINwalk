<template>
    <div>
        <UninTwoFloor />
        <UninTwoFloorOne />
        <RoomModal v-if="roomsStore?.currentRoom" />
    </div>
</template>

<script setup>
import RoomModal from '@/components/RoomModal.vue';
import UninTwoFloor from '@/components/UninTwoFloor.vue';
import UninTwoFloorOne from '@/components/UninTwoFloorOne.vue';
import { useRoomsStore } from '@/stores/rooms';
import { onUnmounted } from 'vue';

const roomsStore = useRoomsStore()

onUnmounted(() => {
    roomsStore.deselectRoom()
})
</script>