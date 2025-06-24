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
    your_location_button: "Current Location",
    building_info_message: "Click on a building to select it.",
    map_instructions: "Press \"Current Location\" to see your position on the map.",
    location_nearby: "You are approximately {distance}m from {building}",
    location_far: "You are not near UNIN. You are approximately {distance}m away.",
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
    your_location_button: "Trenutna lokacija",
    building_info_message: "Pritisnite na zgradu za prikaz tlocrta predavaona.",
    map_instructions: "Pritisnite \"Trenutna lokacija\" za prikaz svoje lokacije na mapi.",
    location_nearby: "Nalazite se {distance}m od {building}-a",
    location_far: "Ne nalazite se blizu UNIN. Udaljeni ste otprilike {distance}m.",
  },
};

const savedLocale = localStorage.getItem("locale") || "en";

const i18n = createI18n({
  locale: savedLocale,
  fallbackLocale: "en",
  messages,
});

export default i18n;
