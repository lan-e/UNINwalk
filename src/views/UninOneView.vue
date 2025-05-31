<template>
    <div class="floor-plan">
        <div class="floor-title">{{$t("floor1")}} (1-21)</div>
        <svg class="floor" viewBox="0 0 1150 400" width="100%" preserveAspectRatio="xMidYMid meet">
            <Room v-for="room in rooms1" :key="room.id" :room="room" />
        </svg>
        <div class="floor-title">{{$t("floor2")}} (22-39)</div>
        <svg class="floor" viewBox="0 0 1150 400" width="100%" preserveAspectRatio="xMidYMid meet">
            <Room v-for="room in rooms2" :key="room.id" :room="room" />
        </svg>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import Room from '@/components/Room.vue';
import { useRoomsStore } from '@/stores/rooms';
import uninData from '../data/unin-data.json'

const roomsStore = useRoomsStore()
const rooms1 = uninData['UNIN1-1']
const rooms2 = uninData['UNIN1-2']

onMounted(() => {
    if(roomsStore.currentRoom) {
        roomsStore.openModal();
    }
})

onUnmounted(() => {
    roomsStore.deselectRoom()
})
</script>

<style scoped>
.floor {
    max-width: 1200px;
}
</style>