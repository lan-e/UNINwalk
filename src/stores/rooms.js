import { defineStore } from "pinia";
import { ref } from "vue";

export const useRoomsStore = defineStore("rooms", () => {
  const currentRoom = ref(null);

  function selectRoom(room) {
    currentRoom.value = room;
  }

  function deselectRoom() {
    currentRoom.value = null;
  }

  return { currentRoom, selectRoom, deselectRoom };
});
