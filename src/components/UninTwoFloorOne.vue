<template>
    <div class="floor-plan">
        <svg viewBox="0 0 1200 400" width="100%" height="100%">
            <text x="600" y="80" font-size="20" font-weight="bold" text-anchor="middle">1. KAT (110-115)</text>

            <!-- Room K-110 -->
            <g :id="'room-' + rooms.k110.id" @click="roomsStore.selectRoom(rooms.k110)"
                :class="{ selected: roomsStore?.currentRoom?.id === rooms.k110.id }">
                <rect x="20" y="110" width="260" height="180" fill="#D3D3D3" stroke="#FF0000" stroke-width="2" />
                <text x="150" y="170" font-weight="bold" text-anchor="middle">K-110</text>
                <text x="150" y="190" font-size="12" text-anchor="middle">PREDAVAONICA</text>
            </g>

            <!-- Room K-111 -->
            <g :id="'room-' + rooms.k111.id" @click="roomsStore.selectRoom(rooms.k111)"
                :class="{ selected: roomsStore?.currentRoom?.id === rooms.k111.id }">
                <rect x="320" y="120" width="150" height="70" fill="#D3D3D3" stroke="#000000" stroke-width="1" />
                <text x="395" y="160" font-weight="bold" text-anchor="middle">K-111</text>
            </g>

            <!-- Room K-112 -->
            <g :id="'room-' + rooms.k112.id" @click="roomsStore.selectRoom(rooms.k112)"
                :class="{ selected: roomsStore?.currentRoom?.id === rooms.k112.id }">
                <rect x="485" y="120" width="150" height="70" fill="#D3D3D3" stroke="#000000" stroke-width="1" />
                <text x="560" y="145" font-weight="bold" text-anchor="middle" font-size="14">K-112</text>
                <text x="560" y="165" font-size="10" text-anchor="middle">STUDENTSKA KNJIŽNICA</text>
            </g>

            <!-- Room K-113 -->
            <g :id="'room-' + rooms.k113.id" @click="roomsStore.selectRoom(rooms.k113)"
                :class="{ selected: roomsStore?.currentRoom?.id === rooms.k113.id }">
                <rect x="650" y="120" width="80" height="70" fill="#D3D3D3" stroke="#000000" stroke-width="1" />
                <text x="690" y="160" font-weight="bold" text-anchor="middle">K-113</text>
            </g>

            <!-- Room K-114 -->
            <g :id="'room-' + rooms.k114.id" @click="roomsStore.selectRoom(rooms.k114)"
                :class="{ selected: roomsStore?.currentRoom?.id === rooms.k114.id }">
                <rect x="745" y="120" width="150" height="70" fill="#D3D3D3" stroke="#000000" stroke-width="1" />
                <text x="820" y="160" font-weight="bold" text-anchor="middle">K-114</text>
            </g>

            <!-- Room K-115 -->
            <g :id="'room-' + rooms.k115.id" @click="roomsStore.selectRoom(rooms.k115)"
                :class="{ selected: roomsStore?.currentRoom?.id === rooms.k115.id }">
                <rect x="930" y="110" width="260" height="180" fill="#D3D3D3" stroke="#FF0000" stroke-width="2" />
                <text x="1060" y="170" font-weight="bold" text-anchor="middle">K-115</text>
                <text x="1060" y="190" font-size="12" text-anchor="middle">PREDAVAONICA</text>
            </g>
        </svg>
    </div>
</template>

<script setup>
import { useRoomsStore } from '@/stores/rooms';
import uninData from '../unin-data.json'

const roomsStore = useRoomsStore()
const rooms = uninData['UNIN2-2']
</script>