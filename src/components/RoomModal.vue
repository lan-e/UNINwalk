<template>
    <div class="modal">
        <div class="modal-title">
            {{ roomsStore?.currentRoom?.type }}
            {{ roomsStore?.currentRoom?.name }}
        </div>
        <div v-if="roomsStore?.currentRoom?.info" class="info-container">
            <div v-for="(item, title) in roomsStore?.currentRoom?.info">
                <div class="info-item">
                    <div class="info-title">
                        {{ formatTitle(title) }}
                    </div>
                    {{ item }}
                </div>
            </div>
        </div>
        <Button v-if="roomsStore?.currentRoom" variant="icon" @click="roomsStore.deselectRoom">
            <template #icon>
                <Icon name="close" />
            </template>
        </Button>
    </div>
    <div v-if="roomsStore?.currentRoom" class="overlay" @click="roomsStore.deselectRoom" />
</template>

<script setup>
import { useRoomsStore } from '@/stores/rooms';
import Button from './UI/Button.vue';
import Icon from './UI/Icon.vue';

const roomsStore = useRoomsStore()

function formatTitle(title) {
    return title.split('_')
            .map((word, index) => 
                index === 0 
                    ? word.charAt(0).toUpperCase() + word.slice(1) 
                    : word
            )
            .join(' ')
}
</script>