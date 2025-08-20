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
            <!-- Typing indicator when bot is generating response -->
            <div v-if="isTyping" class="message bot">
                <div class="message-content typing-bubble">
                    <div class="typing-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
            <Icon
                v-if="messages.length"
                name="delete"
                class="delete-button"
                @click="clearChat"
            />
        </div>

        <div class="chat-input">
            <input v-model="userInput" @keyup.enter="sendMessage" :placeholder="$t('bot_input_message')"
                :disabled="isTyping || isLoading" />
            <button @click="sendMessage" :disabled="!userInput || isTyping">
                <div v-if="isLoading" class="spinner" />
                <Icon v-else name="send" />
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

    // Scroll to bottom when typing bubble appears
    await nextTick()
    scrollToBottom()
    
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

<style scoped>
.typing-bubble {
    padding: 12px 16px;
    display: inline-block;
    max-width: fit-content;
}

.typing-dots {
    display: flex;
    align-items: center;
    gap: 4px;
}

.typing-dots span {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #999;
    animation: typing 1.4s ease-in-out infinite;
}

.typing-dots span:nth-child(1) {
    animation-delay: 0s;
}

.typing-dots span:nth-child(2) {
    animation-delay: 0.2s;
}

.typing-dots span:nth-child(3) {
    animation-delay: 0.4s;
}

@keyframes typing {
    0%, 60%, 100% {
        transform: translateY(0);
        opacity: 0.4;
    }
    30% {
        transform: translateY(-10px);
        opacity: 1;
    }
}

.spinner {
    animation: spin 1s linear infinite;
    border-radius: 50%;
    border: 1px solid #f3f3f3;
    border-top: 1px solid #e30613;
    height: 20px;
    width: 20px;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>