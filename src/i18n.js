import { createI18n } from "vue-i18n";

const messages = {
  en: {
    home: "Home",
    teachers: "Teachers",
    bot_message: "Hello! How may I help you?",
    bot_input_message: "Ask me a question...",
  },
  hr: {
    home: "Početna",
    teachers: "Nastavnici",
    bot_message: "Pozdrav! Kako mogu pomoći?",
    bot_input_message: "Postavite mi pitanje...",
  },
};

const savedLocale = localStorage.getItem("locale") || "en";

const i18n = createI18n({
  locale: savedLocale,
  fallbackLocale: "en",
  messages,
});

export default i18n;
