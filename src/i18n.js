import { createI18n } from "vue-i18n";

const messages = {
  en: {
    home: "Home",
    teachers: "Teachers",
    bot_message: "Hello! How may I help you?",
  },
  hr: {
    home: "Početna",
    teachers: "Nastavnici",
    bot_message: "Pozdrav! Kako ti mogu pomoći?",
  },
};

const savedLocale = localStorage.getItem("locale") || "en";

const i18n = createI18n({
  locale: savedLocale,
  fallbackLocale: "en",
  messages,
});

export default i18n;
