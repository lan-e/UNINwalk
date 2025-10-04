<template>
    <div class="professor-container">
        <div class="professor-image-container">
            <img :src="info.image" alt="" class="professor-image">
        </div>
        <div class="professor-info">
            <div class="name">{{ info.name }}</div>
            <div class="title">{{ info.title }}</div>
            <div class="email">{{ info.email }}</div>
            <div class="icons">
                <a v-if="info.email" :href="`mailto:${info.email}`">
                    <Icon name="mail" />
                </a>
                <a v-if="info.phone" :href="`tel:${info.phone}`">
                    <Icon name="phone" />
                </a>
                <a v-if="info.web" :href="info.web" target="_blank">
                    <Icon name="language" />
                </a>
                <button v-if="info.room" type="button" :data-route="info.room_route" :data-room="info.room" class="router-link link-button">
                    <Icon name="meeting_room" style="pointer-events: none;" />
                    K-{{ info.room }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import Icon from './UI/Icon.vue';
import { useRoomsStore } from '@/stores/rooms';
import { onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
    info: {
        type: Object,
        required: true
    }
});
const roomsStore = useRoomsStore()
const router = useRouter()

let cleanup;
onMounted(() => {
  cleanup = roomsStore.setupRoomClickListener(router);
});

onUnmounted(() => {
  if (cleanup) cleanup();
});
</script>