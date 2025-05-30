import { createI18n } from "vue-i18n";

const messages = {
  en: {
    home: "Home",
    teachers: "Teachers",
    bot_message: "Hello! How may I help you? Ask me about rooms or teachers.",
    bot_input_message: "Ask me a question...",
    floor1: "Ground floor",
    floor2: "First floor",
    initializing_llm_message: "Initializing chatbot...",
    loading_message: "Loading chatbot...",
  },
  hr: {
    home: "Početna",
    teachers: "Nastavnici",
    bot_message: "Pozdrav! Kako mogu pomoći? Možete me pitati o predavaonama ili nastavnicima.",
    bot_input_message: "Postavite mi pitanje...",
    floor1: "Prizemlje",
    floor2: "1. kat",
    initializing_llm_message: "Inicijalizacija chatbot asistenta...",
    loading_message: "Učitavanje chatbot asistenta...",
  },
};

const savedLocale = localStorage.getItem("locale") || "en";

const i18n = createI18n({
  locale: savedLocale,
  fallbackLocale: "en",
  messages,
});

export default i18n;
