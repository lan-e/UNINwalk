<template>
    <div class="chatbot-container">
        <div class="chat-messages" ref="messagesContainer">
            <div v-for="(message, index) in displayMessages" :key="index" :class="['message', message.sender]">
                <div class="message-content" v-html="message.text">
                </div>
                <div class="message-time">
                    {{ message.time }}
                </div>
            </div>
            <div v-if="isLoading">
                <LoadingSpinner :message="loadingMessage" />
            </div>
        </div>

        <div class="chat-input">
            <input v-model="userInput" @keyup.enter="sendMessage" :placeholder="$t('bot_input_message')"
                :disabled="isTyping || isLoading" />
            <button @click="sendMessage" :disabled="!userInput || isTyping">
                <Icon name="send" />
            </button>
            <button @click="clearChat">
                <Icon name="delete" />
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, nextTick, onUnmounted, computed, watch } from 'vue'
import { useRoomsStore } from '@/stores/rooms'
import { useRouter } from 'vue-router'
import Icon from './UI/Icon.vue'
import { getChatbotAnswer, loadChatHistory, saveChatHistory, clearChatHistory } from '@/bot/chatbot'
import { useI18n } from 'vue-i18n'
import LoadingSpinner from './UI/LoadingSpinner.vue'

const props = defineProps({
    isLoading: {
        type: Boolean
    },
    loadingMessage: {
        type: String
    }
})
const { t } = useI18n();
const messages = ref([])
const userInput = ref('')
const isTyping = ref(false)
const messagesContainer = ref(null)
const roomsStore = useRoomsStore()
const router = useRouter()

// Computed property that includes initial message
const displayMessages = computed(() => {
    const initialMessage = {
        text: t('bot_message'),
        sender: 'bot',
        time: new Date().toLocaleTimeString(),
        isInitial: true
    }
    return [initialMessage, ...messages.value]
})

// Watch messages and save to session storage automatically
watch(messages, (newMessages) => {
    saveChatHistory(newMessages);
}, { deep: true });

const sendMessage = async () => {
    if (!userInput.value || isTyping.value) return

    const userQuestion = userInput.value

    // Create user message object
    const userMessage = {
        text: userInput.value,
        sender: 'user',
        time: new Date().toLocaleTimeString(),
        timestamp: new Date()
    }

    messages.value.push(userMessage)
    userInput.value = ''
    isTyping.value = true

    try {
        const botResponse = await getChatbotAnswer(userQuestion)

        // Create bot message object
        const botMessage = {
            text: botResponse,
            sender: 'bot',
            time: new Date().toLocaleTimeString(),
            timestamp: new Date()
        }

        messages.value.push(botMessage)
    } catch (error) {
        console.error('Error getting bot response:', error)
        
        const errorMessage = {
            text: 'Sorry, I encountered an error. Please try again.',
            sender: 'bot',
            time: new Date().toLocaleTimeString(),
            timestamp: new Date()
        }
        
        messages.value.push(errorMessage)
    } finally {
        isTyping.value = false
    }

    await nextTick()
    scrollToBottom()
}

const clearChat = () => {
    messages.value = []
    clearChatHistory()
}

const scrollToBottom = () => {
    if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
}

let cleanup;
onMounted(() => {
    // Load chat history when component mounts
    const savedMessages = loadChatHistory()
    if (savedMessages && savedMessages.length > 0) {
        messages.value = savedMessages
        
        // Scroll to bottom after loading messages
        nextTick(() => {
            scrollToBottom()
        })
    }

    cleanup = roomsStore.setupRoomClickListener(router);
});

onUnmounted(() => {
    if (cleanup) cleanup();
});
</script>