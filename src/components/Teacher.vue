<template>
    <div class="teacher-container">
        <img :src="info.profile_image" alt="" class="teacher-image">
        <div class="teacher-info">
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
                <a href="javascript:void(0)" :data-route="info.room_route" :data-room="info.room" class="router-link">
                    k{{ info.room }}
                </a>
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