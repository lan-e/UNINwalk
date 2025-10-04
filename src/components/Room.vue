<template>
    <g :id="'room-' + room.id" @click="selectRoom"
        :class="['room', { selected: roomsStore?.currentRoom?.id === room.id }, { clickable: isClickable}]">
        <svg width="1131" height="323" x="9.69" y="53.71" viewBox="0 0 1131 323" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M416.118 197.733H490.599V322.491H640.258V197.733H706.091V220.853C709.16 220.842 712.196 220.219 715.023 219.018C717.849 217.818 720.409 216.065 722.552 213.862C724.695 211.659 726.378 209.05 727.504 206.187C728.63 203.324 729.176 200.266 729.11 197.189C729.043 200.266 729.589 203.324 730.715 206.187C731.841 209.05 733.525 211.659 735.668 213.862C737.811 216.065 740.37 217.818 743.196 219.018C746.023 220.219 749.059 220.842 752.129 220.853V197.733H894.981V236.834H1130.31V0.766225H895.067V49.5107H235.747V0.708984H0.689941V236.777L235.933 236.362L235.79 196.703L370.037 197.733V220.882C383.081 220.882 393.056 210.08 393.056 197.003C393.056 210.08 403.046 220.882 416.076 220.882L416.118 197.733Z"
                stroke="#E51D2A" stroke-miterlimit="10" />
        </svg>
        <rect :x="room.x" :y="room.y" :width="room.width" :height="room.height" fill="#D3D3D3" />
        <text :x="room.x + room.width / 2" :y="room.y + 30" font-weight="bold" text-anchor="middle">
            {{ room.name }}
        </text>
        <foreignObject
            v-if="room.type"
            :x="room.x + 5"
            :y="room.y + 40"
            :width="room.width - 10"
            :height="room.height - 50"
            class="room-name"
        >
            {{ room.type }}
        </foreignObject>
        <ToiletsIcon v-if="room.id.includes('toilets')" :x="room.x + 14" :y="room.y" />
        <StairsIconFloorOne v-if="room.id.includes('ground_stairs')" :x="room.x" :y="room.y" />
        <StairsIconGroundFloor v-if="room.id.includes('floor_stairs')" :x="room.x" :y="room.y" />
    </g>
</template>

<script setup>
import { useRoomsStore } from '@/stores/rooms';
import ToiletsIcon from './ToiletsIcon.vue';
import StairsIconFloorOne from './StairsIconFloorOne.vue';
import StairsIconGroundFloor from './StairsIconGroundFloor.vue';
import { useRoute, useRouter } from 'vue-router';
import { onMounted } from 'vue';

const props = defineProps({
    room: {
        type: Object,
        required: true
    }
});

const roomsStore = useRoomsStore();
const isClickable = !props.room.id.includes('toilets') && !props.room.id.includes('_stairs');
const router = useRouter();

const selectRoom = () => {
    if(!isClickable) return;
    roomsStore.selectRoom(props.room);
    roomsStore.openModal();
    router.push({ query: {room: props.room.id }});
};

onMounted(() => {
    const shouldHighlightRoom = router.currentRoute.value.query.room === props.room.id;
    if(shouldHighlightRoom) {
        roomsStore.selectRoom(props.room);
    }
})
</script>