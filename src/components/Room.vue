<template>
    <g :id="'room-' + room.id" @click="selectRoom"
        :class="['room', { selected: roomsStore?.currentRoom?.id === room.id }]">
        <rect :x="room.x" :y="room.y" :width="room.width" :height="room.height" fill="#D3D3D3" stroke="#FF0000"
            stroke-width="2" />
        <text :x="room.x + room.width / 2" :y="room.y + 30" font-weight="bold" text-anchor="middle">
            {{ room.name }}
        </text>
        <text v-if="room.type" :x="room.x + room.width / 2" :y="room.y + 50" font-size="12" text-anchor="middle">
            {{ room.type }}
        </text>
    </g>
</template>

<script setup>
import { useRoomsStore } from '@/stores/rooms';

const props = defineProps({
    room: {
        type: Object,
        required: true
    }
});

const roomsStore = useRoomsStore();

const selectRoom = () => {
    roomsStore.selectRoom(props.room);
};
</script>