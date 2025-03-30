<template>
    <div class="floor-plan">
        <div class="floor-title">PRIZEMLJE (101-109)</div>
        <svg class="floor" viewBox="0 0 1210 340" width="100%" preserveAspectRatio="xMidYMid meet">
            <Room v-for="room in rooms1" :key="room.id" :room="room" />
        </svg>
        <div class="floor-title">1. KAT (110-115)</div>
        <svg class="floor" viewBox="0 0 1210 340" width="100%" preserveAspectRatio="xMidYMid meet">
            <Room v-for="room in rooms2" :key="room.id" :room="room" />
        </svg>
        <RoomModal v-if="roomsStore?.currentRoom && roomsStore.isModalOpen" />
        <Button v-if="roomsStore?.currentRoom" @click="roomsStore.openModal" suffix="Info" class="info-button">
            <template #icon>
                <Icon name="info" />
            </template>
        </Button>
    </div>
</template>

<script setup>
import { onUnmounted } from 'vue';
import Room from '@/components/Room.vue';
import RoomModal from '@/components/RoomModal.vue';
import { useRoomsStore } from '@/stores/rooms';
import uninData from '../unin-data.json'
import Button from '@/components/UI/Button.vue';
import Icon from '@/components/UI/Icon.vue';

const roomsStore = useRoomsStore()
const rooms1 = uninData['UNIN2-1']
const rooms2 = uninData['UNIN2-2']

onUnmounted(() => {
    roomsStore.deselectRoom()
})
</script>

<style scoped>
.floor {
    max-width: 1200px;
}
</style>