<template>
    <div class="modal">
        <div class="modal-title">
            {{ roomsStore?.currentRoom?.type }}
            {{ roomsStore?.currentRoom?.name }}
        </div>
        <div v-if="roomsStore?.currentRoom?.info" class="info-container">
            <div class="info-item">
                <div class="info-title">email</div>
                {{ roomsStore?.currentRoom?.info?.mail }}
            </div>
            <div class="info-item">
                <div class="info-title">telefon</div>
                {{ roomsStore?.currentRoom?.info?.phone }}
            </div>
            <div class="info-item">
                <div class="info-title">radno vrijeme</div>
                {{ roomsStore?.currentRoom?.info?.hours }}
            </div>
            <div class="info-item">
                <div class="info-title">knjižničarka</div>
                <div>{{ roomsStore?.currentRoom?.info?.employee }}</div>
                <div>{{ roomsStore?.currentRoom?.info?.employee_mail }}</div>
            </div>
        </div>
    </div>
    <div v-if="roomsStore?.currentRoom" class="overlay" @click="roomsStore.deselectRoom"></div>
</template>

<script setup>
import { useRoomsStore } from '@/stores/rooms';
const roomsStore = useRoomsStore()
</script>