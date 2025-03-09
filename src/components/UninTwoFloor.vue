<template>
    <div class="floor-plan">
        <svg viewBox="0 0 1200 400" width="100%" height="100%">
            <text x="600" y="80" font-size="20" font-weight="bold" text-anchor="middle">PRIZEMLJE (101-109)</text>

            <!-- Room K-101 -->
            <g :id="'room-' + rooms.k101.id" @click="roomsStore.selectRoom(rooms.k101)"
                :class="{ selected: roomsStore?.currentRoom?.id === rooms.k101.id }">
                <rect x="20" y="180" width="260" height="110" fill="#D3D3D3" stroke="#FF0000" stroke-width="2" />
                <text x="150" y="220" font-weight="bold" text-anchor="middle">K-101</text>
                <text x="150" y="240" font-size="12" text-anchor="middle">PREDAVAONICA</text>
            </g>

            <!-- Room K-102 -->
            <g :id="'room-' + rooms.k102.id" @click="roomsStore.selectRoom(rooms.k102)"
                :class="{ selected: roomsStore?.currentRoom?.id === rooms.k102.id }">
                <rect x="20" y="50" width="260" height="110" fill="#D3D3D3" stroke="#FF0000" stroke-width="2" />
                <text x="150" y="90" font-weight="bold" text-anchor="middle">K-102</text>
                <text x="150" y="110" font-size="12" text-anchor="middle">PREDAVAONICA</text>
            </g>

            <!-- Room K-103 -->
            <g :id="'room-' + rooms.k103.id" @click="roomsStore.selectRoom(rooms.k103)"
                :class="{ selected: roomsStore?.currentRoom?.id === rooms.k103.id }">
                <rect x="320" y="120" width="150" height="70" fill="#D3D3D3" stroke="#000000" stroke-width="1" />
                <text x="395" y="150" font-weight="bold" text-anchor="middle">K-103</text>
            </g>

            <!-- Room K-104 -->
            <g :id="'room-' + rooms.k104.id" @click="roomsStore.selectRoom(rooms.k104)"
                :class="{ selected: roomsStore?.currentRoom?.id === rooms.k104.id }">
                <rect x="485" y="120" width="150" height="70" fill="#D3D3D3" stroke="#000000" stroke-width="1" />
                <text x="560" y="145" font-weight="bold" text-anchor="middle" font-size="14">K-104</text>
                <text x="560" y="160" font-size="10" text-anchor="middle">STUDENTSKA SLUŽBA</text>
                <text x="560" y="175" font-size="10" text-anchor="middle">ZA RAD SA STUDENTIMA</text>
            </g>

            <!-- Room K-105 -->
            <g :id="'room-' + rooms.k105.id" @click="roomsStore.selectRoom(rooms.k105)"
                :class="{ selected: roomsStore?.currentRoom?.id === rooms.k105.id }">
                <rect x="650" y="120" width="80" height="70" fill="#D3D3D3" stroke="#000000" stroke-width="1" />
                <text x="690" y="160" font-weight="bold" text-anchor="middle">K-105</text>
            </g>

            <!-- Room K-106 -->
            <g :id="'room-' + rooms.k106.id" @click="roomsStore.selectRoom(rooms.k106)"
                :class="{ selected: roomsStore?.currentRoom?.id === rooms.k106.id }">
                <rect x="745" y="120" width="80" height="70" fill="#D3D3D3" stroke="#000000" stroke-width="1" />
                <text x="785" y="160" font-weight="bold" text-anchor="middle">K-106</text>
            </g>

            <!-- Room K-107 -->
            <g :id="'room-' + rooms.k107.id" @click="roomsStore.selectRoom(rooms.k107)"
                :class="{ selected: roomsStore?.currentRoom?.id === rooms.k107.id }">
                <rect x="840" y="120" width="80" height="70" fill="#D3D3D3" stroke="#000000" stroke-width="1" />
                <text x="880" y="160" font-weight="bold" text-anchor="middle">K-107</text>
            </g>

            <!-- Room K-108 -->
            <g :id="'room-' + rooms.k108.id" @click="roomsStore.selectRoom(rooms.k108)"
                :class="{ selected: roomsStore?.currentRoom?.id === rooms.k108.id }">
                <rect x="930" y="50" width="260" height="110" fill="#D3D3D3" stroke="#FF0000" stroke-width="2" />
                <text x="1060" y="90" font-weight="bold" text-anchor="middle">K-108</text>
                <text x="1060" y="110" font-size="12" text-anchor="middle">PREDAVAONICA</text>
            </g>

            <!-- Room K-109 -->
            <g :id="'room-' + rooms.k109.id" @click="roomsStore.selectRoom(rooms.k109)"
                :class="{ selected: roomsStore?.currentRoom?.id === rooms.k109.id }">
                <rect x="930" y="180" width="260" height="110" fill="#D3D3D3" stroke="#FF0000" stroke-width="2" />
                <text x="1060" y="220" font-weight="bold" text-anchor="middle">K-109</text>
                <text x="1060" y="240" font-size="12" text-anchor="middle">PREDAVAONICA</text>
            </g>
        </svg>
    </div>
</template>

<script setup>
import { useRoomsStore } from '@/stores/rooms';
import uninData from '../unin-data.json'

const roomsStore = useRoomsStore()
const rooms = uninData['UNIN2-1']
</script>