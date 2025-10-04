<template>
    <div class="floor-plan">
        <div class="floor-title">{{$t("floor1")}} (101-109)</div>
        <svg class="floor" viewBox="0 0 1150 400" width="100%" preserveAspectRatio="xMidYMid meet">
            <Room v-for="room in groundFloorRooms" :key="room.id" :room="room" />
        </svg>
        
        <hr>

        <div class="floor-title">{{$t("floor2")}} (110-115)</div>
        <svg class="floor" viewBox="0 0 1150 400" width="100%" preserveAspectRatio="xMidYMid meet">
            <Room v-for="room in firstFloorRooms" :key="room.id" :room="room" />
        </svg>
    </div>
</template>

<script setup>
import { onUnmounted } from 'vue';
import Room from '@/components/Room.vue';
import { useRoomsStore } from '@/stores/rooms';
import uninData from '../data/unin-data.json'
import { useRouter } from 'vue-router';

const roomsStore = useRoomsStore()
const groundFloorRooms = uninData['UNIN2-1']
const firstFloorRooms = uninData['UNIN2-2']
const router = useRouter()

onUnmounted(() => {
    roomsStore.deselectRoom()
    router.push({ query: null })
})
</script>

<style scoped>
.floor {
    max-width: 1200px;
}
</style>