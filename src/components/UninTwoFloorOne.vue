<template>
    <div class="floor-plan">
        <svg viewBox="0 0 1200 400" width="100%" height="100%">
            <text x="600" y="80" font-size="20" font-weight="bold" text-anchor="middle">1. KAT (110-115)</text>

            <!-- Room K-110 -->
            <g :id="'room-' + rooms.k110.id" @click="selectRoom(rooms.k110)"
                :class="{ selected: selectedRoom === rooms.k110 }">
                <rect x="20" y="110" width="260" height="180" fill="#D3D3D3" stroke="#FF0000" stroke-width="2" />
                <text x="150" y="170" font-weight="bold" text-anchor="middle">K-110</text>
                <text x="150" y="190" font-size="12" text-anchor="middle">PREDAVAONICA</text>
            </g>

            <!-- Room K-111 -->
            <g :id="'room-' + rooms.k111.id" @click="selectRoom(rooms.k111)"
                :class="{ selected: selectedRoom === rooms.k111 }">
                <rect x="320" y="120" width="150" height="70" fill="#D3D3D3" stroke="#000000" stroke-width="1" />
                <text x="395" y="160" font-weight="bold" text-anchor="middle">K-111</text>
            </g>

            <!-- Room K-112 -->
            <g :id="'room-' + rooms.k112.id" @click="selectRoom(rooms.k112)"
                :class="{ selected: selectedRoom === rooms.k112 }">
                <rect x="485" y="120" width="150" height="70" fill="#D3D3D3" stroke="#000000" stroke-width="1" />
                <text x="560" y="145" font-weight="bold" text-anchor="middle" font-size="14">K-112</text>
                <text x="560" y="165" font-size="10" text-anchor="middle">STUDENTSKA KNJIŽNICA</text>
            </g>

            <!-- Room K-113 -->
            <g :id="'room-' + rooms.k113.id" @click="selectRoom(rooms.k113)"
                :class="{ selected: selectedRoom === rooms.k113 }">
                <rect x="650" y="120" width="80" height="70" fill="#D3D3D3" stroke="#000000" stroke-width="1" />
                <text x="690" y="160" font-weight="bold" text-anchor="middle">K-113</text>
            </g>

            <!-- Room K-114 -->
            <g :id="'room-' + rooms.k114.id" @click="selectRoom(rooms.k114)"
                :class="{ selected: selectedRoom === rooms.k114 }">
                <rect x="745" y="120" width="150" height="70" fill="#D3D3D3" stroke="#000000" stroke-width="1" />
                <text x="820" y="160" font-weight="bold" text-anchor="middle">K-114</text>
            </g>

            <!-- Room K-115 -->
            <g :id="'room-' + rooms.k115.id" @click="selectRoom(rooms.k115)"
                :class="{ selected: selectedRoom === rooms.k115 }">
                <rect x="930" y="110" width="260" height="180" fill="#D3D3D3" stroke="#FF0000" stroke-width="2" />
                <text x="1060" y="170" font-weight="bold" text-anchor="middle">K-115</text>
                <text x="1060" y="190" font-size="12" text-anchor="middle">PREDAVAONICA</text>
            </g>
        </svg>
        <div v-if="selectedRoom?.id === 'k112'" class="modal">
            <div class="modal-title">
                {{ rooms.k112.type }}
            </div>
            <div class="info">
                <div class="info-title">email</div>
                {{ rooms.k112.info.mail }}
            </div>
            <div class="info">
                <div class="info-title">telefon</div>
                {{ rooms.k112.info.phone }}
            </div>
            <div class="info">
                <div class="info-title">radno vrijeme</div>
                {{ rooms.k112.info.hours }}
            </div>
            <div class="info">
                <div class="info-title">knjižničarka</div>
                <div>{{ rooms.k112.info.employee }}</div>
                <div>{{ rooms.k112.info.employee_mail }}</div>
            </div>
        </div>
        <div v-if="selectedRoom?.id === 'k112'" class="overlay" @click="selectedRoom = null"></div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const selectedRoom = ref(null);
const rooms = {
    k110: { id: 'k110', name: 'K-110', type: 'PREDAVAONICA' },
    k111: { id: 'k111', name: 'K-111', type: 'KABINET' },
    k112: {
        id: 'k112', name: 'K-112', type: 'STUDENTSKA KNJIŽNICA',
        info: {
            'hours': 'pon, uto, sri, pet  9-17 h, čet 9-20 h',
            'phone': '+385 (0)42 493 316',
            'mail': 'knjiznica.vz@unin.hr',
            'employee': 'Jasna Šipek',
            'employee_mail': 'jasna.sipek@unin.hr'
        }
    },
    k113: { id: 'k113', name: 'K-113', type: 'KABINET' },
    k114: { id: 'k114', name: 'K-114', type: 'KABINET' },
    k115: { id: 'k115', name: 'K-115', type: 'PREDAVAONICA' },
}

function selectRoom(room) {
    selectedRoom.value = room;
}
</script>