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
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, nextTick, onUnmounted, computed } from 'vue'
import { useRoomsStore } from '@/stores/rooms'
import { useRouter } from 'vue-router'
import Icon from './UI/Icon.vue'
import { getChatbotAnswer } from '@/bot/chatbot'
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

let cleanup;
onMounted(() => {
  cleanup = roomsStore.setupRoomClickListener(router);
});

onUnmounted(() => {
  if (cleanup) cleanup();
});
</script>