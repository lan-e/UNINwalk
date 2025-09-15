import { createI18n } from "vue-i18n";

const messages = {
  en: {
    home: "Home",
    professors: "Professors",
    bot_message: "Hello! How may I help you? Ask me about rooms or professors.",
    bot_input_message: "Ask me a question...",
    floor1: "Ground floor",
    floor2: "First floor",
    initializing_llm_message: "Initializing chatbot...",
    loading_message: "Loading chatbot...",
    your_location_button: "Current Location",
    building_info_message: "Click on a building to select it.",
    available_parking_spots: "Available spots are marked under P1 and P2 parking slots.",
    map_instructions: "Press \"Current Location\" to see your position on the map.",
    location_nearby: "You are approximately {distance}m from {location}",
    location_far: "You are not near UNIN. You are approximately {distance}m away.",
    location_inside: "You are inside {location}.",
    location_inside_parking: "You are in parking area {location}.",
    location_nearby_parking: "You are near parking area {location}.",
    coming_soon: "Coming soon...",
    registerButton: "New here? Register",
    loginButton: "Login",
    deleteButton: "Delete",
    loginPageTitle: "Register/login or continue as a guest.",
    enterAsGuestButton: "Continue as a guest",
    loggedAsGuest: "Guest",
    registeredStudentsTitle: "Registered students",
    registered: "Registered"
  },
  hr: {
    home: "Početna",
    professors: "Profesori",
    bot_message: "Pozdrav! Kako mogu pomoći? Možete me pitati o predavaonama ili profesorima.",
    bot_input_message: "Postavite mi pitanje...",
    floor1: "Prizemlje",
    floor2: "1. kat",
    initializing_llm_message: "Inicijalizacija chatbot asistenta...",
    loading_message: "Učitavanje chatbot asistenta...",
    your_location_button: "Trenutna lokacija",
    building_info_message: "Pritisnite na zgradu za prikaz tlocrta predavaona.",
    available_parking_spots: "Broj slobodnih parkirnih mjesta označen je ispod P1 i P2 parkinga.",
    map_instructions: "Pritisnite \"Trenutna lokacija\" za prikaz svoje lokacije na mapi.",
    location_nearby: "Nalazite se {distance}m od {location}.",
    location_far: "Ne nalazite se blizu UNIN. Udaljeni ste otprilike {distance}m.",
    location_inside: "Nalazite se unutar {location}.",
    location_inside_parking: "Nalazite se na parkingu {location}.",
    location_nearby_parking: "Nalazite se u blizini parkinga {location}.",
    coming_soon: "Uskoro...",
    registerButton: "Nemaš profil? Registriraj se",
    loginButton: "Logiraj se",
    deleteButton: "Obriši",
    loginPageTitle: "Registriraj/logiraj se ili nastavi kao gost.",
    enterAsGuestButton: "Nastavi kao gost",
    loggedAsGuest: "Gost",
    registeredStudentsTitle: "Registrirani studenti",
    registered: "Registriran"
  },
};

const savedLocale = localStorage.getItem("locale") || "en";

const i18n = createI18n({
  locale: savedLocale,
  fallbackLocale: "en",
  messages,
});

export default i18n;
