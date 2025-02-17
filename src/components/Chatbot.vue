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
                <img :src="SendIcon" />
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import SendIcon from "../assets/send_icon.svg"

const messages = ref([
    {
        text: 'Pozdrav! Kako vam mogu pomoći?',
        sender: 'bot',
        time: new Date().toLocaleTimeString()
    }
])
const userInput = ref('')
const isTyping = ref(false)
const messagesContainer = ref(null)

const responses = {
    'radno vrijeme': 'Fakultet je otvoren od ponedjeljka do petka, od 7:00 do 20:00.',
    'kontakt': 'Možete nas kontaktirati na email: <a href="mailto:info@unin.hr">info@unin.hr</a> ili telefon: <a href="tel:012345678">01/234-5678</a>',
    'upisi': 'Upisi započinju u srpnju. Više informacija možete pronaći na <a href="https://www.unin.hr/popis-studijskih-programa/" target="_blank">službenim stranicama fakulteta</a>.',
    'predavaona': 'Molim vas unesite broj predavaone koju tražite, npr. "Gdje je predavaona 101?"'
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

const sendMessage = async () => {
    if (!userInput.value || isTyping.value) return

    messages.value.push({
        text: userInput.value,
        sender: 'user',
        time: new Date().toLocaleTimeString()
    })

    const userQuestion = userInput.value.toLowerCase()
    userInput.value = ''
    isTyping.value = true

    await new Promise(resolve => setTimeout(resolve, 1000))

    let botResponse = 'Oprostite, ne razumijem pitanje. Možete pitati o radnom vremenu, kontaktu, upisima ili lokaciji predavaona.'

    for (const [key, response] of Object.entries(responses)) {
        if (userQuestion.includes(key)) {
            botResponse = response
            break
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
})
</script>

<style scoped lang="scss">
.chatbot-container {
    display: flex;
    flex-direction: column;
    background: white;
    width: 100%;
    max-width: 400px;
    height: 500px;
    border: 1px solid #ddd;
    border-radius: 8px;
}

.chat-messages {
    display: flex;
    flex-direction: column;
    gap: 16px;
    flex: 1;
    overflow-y: auto;
    padding: 16px;
}

.message {
    max-width: 80%;
    padding: 8px 16px;
    border-radius: 16px;
}

.message.user {
    align-self: flex-end;
    background: #535252;
    color: white;
    border-bottom-right-radius: 4px;
}

.message.bot {
    align-self: flex-start;
    background: #f0f0f0;
    border-bottom-left-radius: 0.25rem;
}

.message-time {
    font-size: 12px;
    color: #969696;
    margin-top: 4px;
}

.chat-input {
    padding: 1rem;
    display: flex;
    gap: 0.5rem;
    border-top: 1px solid #ddd;
}

input {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    outline: none;
}

button {
    display: flex;
    align-items: center;
    background: #E30613;
    color: white;
    border: none;
    padding: 8px;
    border-radius: 4px;
    cursor: pointer;
}

button:disabled {
    background: #ccc;
    cursor: not-allowed;
}
</style>