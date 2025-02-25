<template>
    <div class="floor-plan">
        <svg viewBox="0 0 1200 400" width="100%" height="100%">
            <text x="600" y="80" font-size="20" font-weight="bold" text-anchor="middle">PRIZEMLJE (101-109)</text>

            <!-- Room K-101 -->
            <g :id="'room-' + rooms.k101.id" @click="selectRoom(rooms.k101)"
                :class="{ selected: selectedRoom === rooms.k101 }">
                <rect x="20" y="180" width="260" height="110" fill="#D3D3D3" stroke="#FF0000" stroke-width="2" />
                <text x="150" y="220" font-weight="bold" text-anchor="middle">K-101</text>
                <text x="150" y="240" font-size="12" text-anchor="middle">PREDAVAONICA</text>
            </g>

            <!-- Room K-102 -->
            <g :id="'room-' + rooms.k102.id" @click="selectRoom(rooms.k102)"
                :class="{ selected: selectedRoom === rooms.k102 }">
                <rect x="20" y="50" width="260" height="110" fill="#D3D3D3" stroke="#FF0000" stroke-width="2" />
                <text x="150" y="90" font-weight="bold" text-anchor="middle">K-102</text>
                <text x="150" y="110" font-size="12" text-anchor="middle">PREDAVAONICA</text>
            </g>

            <!-- Room K-103 -->
            <g :id="'room-' + rooms.k103.id" @click="selectRoom(rooms.k103)"
                :class="{ selected: selectedRoom === rooms.k103 }">
                <rect x="320" y="120" width="150" height="70" fill="#D3D3D3" stroke="#000000" stroke-width="1" />
                <text x="395" y="150" font-weight="bold" text-anchor="middle">K-103</text>
            </g>

            <!-- Room K-104 -->
            <g :id="'room-' + rooms.k104.id" @click="selectRoom(rooms.k104)"
                :class="{ selected: selectedRoom === rooms.k104 }">
                <rect x="485" y="120" width="150" height="70" fill="#D3D3D3" stroke="#000000" stroke-width="1" />
                <text x="560" y="145" font-weight="bold" text-anchor="middle" font-size="14">K-104</text>
                <text x="560" y="160" font-size="10" text-anchor="middle">STUDENTSKA SLUŽBA</text>
                <text x="560" y="175" font-size="10" text-anchor="middle">ZA RAD SA STUDENTIMA</text>
            </g>

            <!-- Room K-105 -->
            <g :id="'room-' + rooms.k105.id" @click="selectRoom(rooms.k105)"
                :class="{ selected: selectedRoom === rooms.k105 }">
                <rect x="650" y="120" width="80" height="70" fill="#D3D3D3" stroke="#000000" stroke-width="1" />
                <text x="690" y="160" font-weight="bold" text-anchor="middle">K-105</text>
            </g>

            <!-- Room K-106 -->
            <g :id="'room-' + rooms.k106.id" @click="selectRoom(rooms.k106)"
                :class="{ selected: selectedRoom === rooms.k106 }">
                <rect x="745" y="120" width="80" height="70" fill="#D3D3D3" stroke="#000000" stroke-width="1" />
                <text x="785" y="160" font-weight="bold" text-anchor="middle">K-106</text>
            </g>

            <!-- Room K-107 -->
            <g :id="'room-' + rooms.k107.id" @click="selectRoom(rooms.k107)"
                :class="{ selected: selectedRoom === rooms.k107 }">
                <rect x="840" y="120" width="80" height="70" fill="#D3D3D3" stroke="#000000" stroke-width="1" />
                <text x="880" y="160" font-weight="bold" text-anchor="middle">K-107</text>
            </g>

            <!-- Room K-108 -->
            <g :id="'room-' + rooms.k108.id" @click="selectRoom(rooms.k108)"
                :class="{ selected: selectedRoom === rooms.k108 }">
                <rect x="930" y="50" width="260" height="110" fill="#D3D3D3" stroke="#FF0000" stroke-width="2" />
                <text x="1060" y="90" font-weight="bold" text-anchor="middle">K-108</text>
                <text x="1060" y="110" font-size="12" text-anchor="middle">PREDAVAONICA</text>
            </g>

            <!-- Room K-109 -->
            <g :id="'room-' + rooms.k109.id" @click="selectRoom(rooms.k109)"
                :class="{ selected: selectedRoom === rooms.k109 }">
                <rect x="930" y="180" width="260" height="110" fill="#D3D3D3" stroke="#FF0000" stroke-width="2" />
                <text x="1060" y="220" font-weight="bold" text-anchor="middle">K-109</text>
                <text x="1060" y="240" font-size="12" text-anchor="middle">PREDAVAONICA</text>
            </g>
        </svg>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const selectedRoom = ref(null)
const rooms = {
    k101: { id: 'k101', name: 'K-101', type: 'PREDAVAONICA' },
    k102: { id: 'k102', name: 'K-102', type: 'PREDAVAONICA' },
    k103: { id: 'k103', name: 'K-103', type: 'KABINET' },
    k104: { id: 'k104', name: 'K-104', type: 'STUDENTSKA SLUŽBA' },
    k105: { id: 'k105', name: 'K-105', type: 'KABINET' },
    k106: { id: 'k106', name: 'K-106', type: 'KABINET' },
    k107: { id: 'k107', name: 'K-107', type: 'KABINET' },
    k108: { id: 'k108', name: 'K-108', type: 'PREDAVAONICA' },
    k109: { id: 'k109', name: 'K-109', type: 'PREDAVAONICA' },
}
function selectRoom(room) {
    selectedRoom.value = room;
}
</script>