<template>
  <div class="chatbot-container">
    <div class="chat-messages" ref="messagesContainer">
      <div
        v-for="(message, index) in displayMessages"
        :key="index"
        :class="['message', message.sender]"
      >
        <div
          v-if="message.text"
          class="message-content"
          v-html="message.text"
        />
        <div
          v-else-if="message.sender === 'bot'"
          class="message-content typing-bubble"
        >
          <div class="typing-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div v-if="message.text" class="message-time">
          {{ message.time }}
        </div>
      </div>
      <!-- Typing indicator when bot is generating response -->
      <div v-if="isGeneratingAnswer && !isStreaming" class="message bot">
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
      <input
        v-model="userInput"
        @keyup.enter="sendMessage"
        :placeholder="t('bot_input_message')"
      />
      <button @click="sendMessage" :disabled="isSendButtonDisabled">
        <Icon name="send" />
      </button>
    </div>

    <div v-if="isEvaluating" class="evaluation-loader">
      <div class="evaluation-loader-content">
        <div class="loader-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <span class="evaluation-text">{{ t("evaluating") }}</span>
      </div>
    </div>

    <!-- RAGAs Evaluation Display -->
    <div v-if="aggregatedEvaluation && !isEvaluating" class="ragas-container">
      <div
        class="ragas-header"
        :class="{ 'ragas-header-active': showRagasSection }"
        @click="toggleRagasSection"
      >
        <div class="ragas-title">
          <Icon :name="showRagasSection ? 'expand_more' : 'chevron_right'" />
          <span>{{ t("ragas_title") }}</span>
        </div>
        <button
          @click.stop="copyForGoogleForms(aggregatedEvaluation)"
          class="copy-button"
          :class="{ 'copy-success': copySuccess }"
          :title="copySuccess ? 'Copied!' : 'Copy RAGAs values'"
        >
          <Icon :name="copySuccess ? 'check' : 'content_copy'" />
        </button>
      </div>

      <div v-if="showRagasSection" class="ragas-content">
        <div class="ragas-metrics">
          <div
            v-if="aggregatedEvaluation.metrics.faithfulness"
            class="metric-item"
            :class="
              getScoreClass(aggregatedEvaluation.metrics.faithfulness.score)
            "
          >
            <span class="metric-label">{{ t("faithfulness") }}</span>
            <span class="metric-value">
              {{ formatScore(aggregatedEvaluation.metrics.faithfulness.score) }}
            </span>
          </div>

          <div
            v-if="aggregatedEvaluation.metrics.answerRelevancy"
            class="metric-item"
            :class="
              getScoreClass(aggregatedEvaluation.metrics.answerRelevancy.score)
            "
          >
            <span class="metric-label">{{ t("answer_relevancy") }}</span>
            <span class="metric-value">
              {{
                formatScore(aggregatedEvaluation.metrics.answerRelevancy.score)
              }}
            </span>
          </div>

          <div
            v-if="aggregatedEvaluation.metrics.contextPrecision"
            class="metric-item"
            :class="
              getScoreClass(aggregatedEvaluation.metrics.contextPrecision.score)
            "
          >
            <span class="metric-label">{{ t("context_precision") }}</span>
            <span class="metric-value">
              {{
                formatScore(aggregatedEvaluation.metrics.contextPrecision.score)
              }}
            </span>
          </div>

          <div
            class="metric-item overall"
            :class="getScoreClass(aggregatedEvaluation.overallScore)"
          >
            <span class="metric-label">{{ t("overall_score") }}</span>
            <span class="metric-value">
              {{ formatScore(aggregatedEvaluation.overallScore) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, onUnmounted, computed, watch } from "vue";
import { useRoomsStore } from "@/stores/rooms";
import { useRouter } from "vue-router";
import Icon from "./UI/Icon.vue";
import {
  getChatbotAnswerStream,
  loadChatHistory,
  saveChatHistory,
  clearChatHistory,
} from "@/bot/chatbot";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const messages = ref([]);
const userInput = ref("");
const isGeneratingAnswer = ref(false);
const isStreaming = ref(false);
const isEvaluating = ref(false);
const messagesContainer = ref(null);
const roomsStore = useRoomsStore();
const router = useRouter();

// Evaluation state
const evaluationEnabled = ref(true);
const lastEvaluation = ref(null);
const conversationEvaluations = ref([]);
const aggregatedEvaluation = ref(null);
const showRagasSection = ref(false);
const copySuccess = ref(false);

// send button is disabled if chatbot is loading, input is empty or generating answer
const isSendButtonDisabled = computed(() => {
  return !userInput.value || isGeneratingAnswer.value;
});

// Computed property that includes initial message
const displayMessages = computed(() => {
  const initialMessage = {
    text: t("bot_message"),
    sender: "bot",
    time: new Date().toLocaleTimeString(),
    isInitial: true,
  };
  return [initialMessage, ...messages.value];
});

// Watch messages and save to local storage automatically
watch(
  messages,
  (newMessages) => {
    saveChatHistory(newMessages);
  },
  { deep: true },
);

const sendMessage = async () => {
  if (!userInput.value || isGeneratingAnswer.value) return;

  const userQuestion = userInput.value;

  // Create user message object
  const userMessage = {
    text: userInput.value,
    sender: "user",
    time: new Date().toLocaleTimeString(),
    timestamp: new Date(),
  };

  messages.value.push(userMessage);
  userInput.value = "";
  isGeneratingAnswer.value = true;

  // Create bot message placeholder for streaming
  const botMessage = {
    text: "",
    sender: "bot",
    time: new Date().toLocaleTimeString(),
    timestamp: new Date(),
    evaluation: null,
    question: userQuestion,
    showDetails: false,
  };
  messages.value.push(botMessage);
  const botMessageIndex = messages.value.length - 1;

  // Start streaming - hides typing indicator but keeps button disabled
  isStreaming.value = true;

  // Scroll to bottom when bot message appears
  await nextTick();
  scrollToBottom();

  try {
    // Call chatbot with streaming and evaluation option
    const result = await getChatbotAnswerStream(
      userQuestion,
      (_token, fullText) => {
        // Update bot message text as tokens arrive
        messages.value[botMessageIndex].text = fullText;
        scrollToBottom();
      },
      {
        evaluate: evaluationEnabled.value,
        onEvaluationStart: () => {
          isEvaluating.value = true;
        },
      },
    );

    if (result.evaluation) {
      lastEvaluation.value = {
        ...result.evaluation,
        question: userQuestion,
        answer: result.answer,
        timestamp: new Date(),
      };
      conversationEvaluations.value.push(lastEvaluation.value);
      calculateAggregatedEvaluation();
      // Update the bot message with evaluation
      messages.value[botMessageIndex].evaluation = result.evaluation;
    }
    isEvaluating.value = false;
  } catch (error) {
    console.error("Error getting bot response:", error);

    // Update bot message with error text
    messages.value[botMessageIndex].text =
      "Oprosti, došlo je do greške. Molimo pokušaj ponovno.";
    isEvaluating.value = false;
  } finally {
    isGeneratingAnswer.value = false;
    isStreaming.value = false;
  }

  await nextTick();
  scrollToBottom();
};

const clearChat = () => {
  messages.value = [];
  clearChatHistory();
  conversationEvaluations.value = [];
  aggregatedEvaluation.value = null;
  lastEvaluation.value = null;
};

const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
};

// calculate aggregated evaluation (bez contextRecall)
const calculateAggregatedEvaluation = () => {
  if (conversationEvaluations.value.length === 0) {
    aggregatedEvaluation.value = null;
    return;
  }

  const metrics = {
    faithfulness: [],
    answerRelevancy: [],
    contextPrecision: [],
  };

  // Collect all scores
  conversationEvaluations.value.forEach((evaluation) => {
    if (evaluation.faithfulness !== undefined) {
      metrics.faithfulness.push(evaluation.faithfulness);
    }
    if (evaluation.answerRelevancy !== undefined) {
      metrics.answerRelevancy.push(evaluation.answerRelevancy);
    }
    if (evaluation.contextPrecision !== undefined) {
      metrics.contextPrecision.push(evaluation.contextPrecision);
    }
  });

  // Calculate averages
  const avgMetrics = {};

  Object.keys(metrics).forEach((key) => {
    if (metrics[key].length > 0) {
      const avg = metrics[key].reduce((a, b) => a + b, 0) / metrics[key].length;
      avgMetrics[key] = {
        score: avg,
        reasoning: `Prosječna vrijednost iz ${metrics[key].length} evaluacija`,
      };
    }
  });

  // Calculate overall score
  const allScores = Object.values(avgMetrics).map((m) => m.score);
  const overallScore =
    allScores.length > 0
      ? allScores.reduce((a, b) => a + b, 0) / allScores.length
      : 0;

  aggregatedEvaluation.value = {
    metrics: avgMetrics,
    overallScore,
    question: `Cijela konverzacija (${conversationEvaluations.value.length} odgovora)`,
  };
};

const toggleRagasSection = () => {
  showRagasSection.value = !showRagasSection.value;
};

// copy for Google Forms (bez contextRecall)
const copyForGoogleForms = async (evaluation) => {
  if (!evaluation) return;

  const metrics = evaluation.metrics;

  // format:faithfulness TAB answerRelevancy TAB contextPrecision TAB overall
  const copyText = `${(metrics.faithfulness?.score || 0).toFixed(2)}\t${(metrics.answerRelevancy?.score || 0).toFixed(2)}\t${(metrics.contextPrecision?.score || 0).toFixed(2)}\t${(evaluation.overallScore || 0).toFixed(2)}`;

  try {
    await navigator.clipboard.writeText(copyText);
    copySuccess.value = true;
    setTimeout(() => {
      copySuccess.value = false;
    }, 2000);
  } catch (error) {
    console.error("Failed to copy:", error);
  }
};

// Format score as percentage
const formatScore = (score) => {
  return score !== undefined ? score.toFixed(2) : "N/A";
};

// Get score class for styling
const getScoreClass = (score) => {
  if (score === undefined) return "";
  if (score >= 0.75) return "score-high";
  if (score >= 0.5) return "score-medium";
  return "score-low";
};

let cleanup;
onMounted(() => {
  // Load chat history when component mounts
  const savedMessages = loadChatHistory();
  if (savedMessages && savedMessages.length > 0) {
    messages.value = savedMessages;

    // Extract evaluations from saved messages
    conversationEvaluations.value = savedMessages
      .filter((msg) => msg.sender === "bot" && msg.evaluation)
      .map((msg) => ({
        ...msg.evaluation,
        question: msg.question || "Pitanje nije spremljeno",
        timestamp: msg.timestamp,
      }));

    // Calculate aggregated evaluation from loaded messages
    if (conversationEvaluations.value.length > 0) {
      calculateAggregatedEvaluation();
      showRagasSection.value = false;
    }

    // Scroll to bottom after loading messages
    nextTick(() => {
      scrollToBottom();
    });
  }

  cleanup = roomsStore.setupRoomClickListener(router);
});

onUnmounted(() => {
  if (cleanup) cleanup();
});
</script>
