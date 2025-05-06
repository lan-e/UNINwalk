<template>
    <div class="chatbot-container">
        <div class="chat-messages" ref="messagesContainer">
            <div v-for="(message, index) in messages" :key="index" :class="['message', message.sender]">
                <div class="message-content" v-html="message.text">
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
import { ref, onMounted, nextTick, onUnmounted } from 'vue'
import { useRoomsStore } from '@/stores/rooms'
import { useRouter } from 'vue-router'
import uninData from '../unin-data.json'
import Icon from './UI/Icon.vue'
import { getChatbotAnswer } from '@/bot/chatbot'

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

    const userQuestion = userInput.value

    messages.value.push({
        text: userInput.value,
        sender: 'user',
        time: new Date().toLocaleTimeString()
    })

    userInput.value = ''
    isTyping.value = true
    const botResponse = await getChatbotAnswer(userQuestion)

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

const handleRouterLinkClick = (e) => {
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
                console.log('Room not found:', room)
            }
        }
        router.push(route);
    }
};

onMounted(() => {
    scrollToBottom()
    document.addEventListener('click', handleRouterLinkClick);
})

onUnmounted(() => {
  document.removeEventListener('click', handleRouterLinkClick);
});
</script>