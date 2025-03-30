<template>
    <div class="chatbot-container">
        <div class="chat-messages" ref="messagesContainer">
            <div v-for="(message, index) in messages" :key="index" :class="['message', message.sender]">
                <div class="message-content" v-html="formatMessage(message.text)">
                </div>
                <div class="message-time">
                    {{ message.time }}
                </div>
            </div>
        </div>

        <div class="chat-input">
            <input v-model="userInput" @keyup.enter="sendMessage" placeholder="Postavite pitanje..."
                :disabled="isTyping" />
            <button @click="sendMessage" :disabled="!userInput || isTyping">
                <Icon name="send" />
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRoomsStore } from '@/stores/rooms'
import { useRouter } from 'vue-router'
import uninData from '../unin-data.json'
import Icon from './UI/Icon.vue'

const messages = ref([
    {
        text: 'Pozdrav! Kako ti mogu pomoći?',
        sender: 'bot',
        time: new Date().toLocaleTimeString()
    }
])
const userInput = ref('')
const isTyping = ref(false)
const messagesContainer = ref(null)
const roomsStore = useRoomsStore()
const router = useRouter()

const responses = {
    'radno vrijeme': 'Fakultet je otvoren od ponedjeljka do petka, od 7:00 do 20:00.',
    'kontakt': 'Možete nas kontaktirati na email: <a href="mailto:info@unin.hr">info@unin.hr</a> ili telefon: <a href="tel:012345678">01/234-5678</a>',
    'upisi': 'Upisi započinju u srpnju. Više informacija možete pronaći na <a href="https://www.unin.hr/popis-studijskih-programa/" target="_blank">službenim stranicama fakulteta</a>.',
    'predavaona': 'Molim vas unesite broj predavaone koju tražite, npr. "Gdje je predavaona 101?"',
}

function formatMessage(text) {
    if (text.includes('<a href=')) {
        return text
    }

    const urlRegex = /(https?:\/\/[^\s]+)/g
    return text.replace(urlRegex, url =>
        `<a href="${url}" target="_blank">${url}</a>`
    )
}

function findRoom(room) {
    for (let section of ['UNIN2-1', 'UNIN2-2', 'UNIN1-1', 'UNIN1-2']) {
        if (uninData[section] && uninData[section][`k${room}`]) {
            // return both the room info and the floor name
            return {
                ...uninData[section][`k${room}`],
                section: section
            };
        }
    }
    return null; // return null if room is not found
}

const sendMessage = async () => {
    if (!userInput.value || isTyping.value) return

    const userQuestion = userInput.value.toLowerCase()

    messages.value.push({
        text: userInput.value,
        sender: 'user',
        time: new Date().toLocaleTimeString()
    })

    userInput.value = ''
    isTyping.value = true

    await new Promise(resolve => setTimeout(resolve, 1000))

    let botResponse = 'Oprostite, ne razumijem pitanje. Možete pitati o radnom vremenu, kontaktu, upisima ili lokaciji predavaona.'

    const roomRegex = /\b([1-9]|[1-9][0-9]|[1-2][0-9][0-9]|300)\b/g
    const roomMatches = userQuestion.match(roomRegex)

    if (roomMatches && roomMatches.length > 0) {
        const roomNumber = roomMatches[0]
        const roomInfo = findRoom(roomNumber)
        console.log('roominof', roomInfo)

        // determine which section the room is in
        let roomSection = ''
        let routeSection = ''
        if (roomInfo && roomInfo.section) {
            roomSection = `${roomInfo.section}`
        }

        if (roomSection === 'UNIN2-1' || roomSection === 'UNIN2-2') {
            routeSection = 'unin2'
        }
        if (roomSection === 'UNIN1-1' || roomSection === 'UNIN1-2') {
            routeSection = 'unin1'
        }

        botResponse = `Predavaona <a href="javascript:void(0)" class="router-link" data-route="${routeSection}" data-room="${roomNumber}">${roomNumber}</a> nalazi se u ${roomSection}. Klik na broj predavaone otvara njenu lokaciju!`
    } else {
        for (const [key, response] of Object.entries(responses)) {
            if (userQuestion.includes(key)) {
                botResponse = response
                break
            }
        }
    }

    messages.value.push({
        text: botResponse,
        sender: 'bot',
        time: new Date().toLocaleTimeString()
    })

    isTyping.value = false

    await nextTick()
    scrollToBottom()
}

const scrollToBottom = () => {
    if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
}

onMounted(() => {
    scrollToBottom()

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('router-link')) {
            const route = e.target.getAttribute('data-route')
            const room = e.target.getAttribute('data-room')

            if (room) {
                let roomInfo = findRoom(room);

                if (roomInfo) {
                    roomsStore.currentRoom = {
                        id: roomInfo.id,
                        name: roomInfo.name,
                        type: roomInfo.type,
                        info: roomInfo.info,
                    }
                    console.log('Room saved to store:', roomsStore.currentRoom)
                } else {
                    console.log('Room not found');
                }
            }

            router.push(route)
        }
    })
})
</script>