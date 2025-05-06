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

async function getAnswer(userQuestion) {
  try {
    const response = await fetch("/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ question: userQuestion })
    });
    
    if (response.ok) {
      const json = await response.json();
      return json.message;
    } else {
      console.error("Error response:", response.status);
      return "Žao mi je, nisam uspio obraditi vaš upit.";
    }
  } catch (error) {
    console.error("Error answering question:", error);
    return "Žao mi je, došlo je do pogreške pri komunikaciji sa serverom.";
  }
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
    const botResponse = await getAnswer(userQuestion)

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