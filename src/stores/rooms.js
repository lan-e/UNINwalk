import { defineStore } from "pinia";
import { ref } from "vue";

export const useRoomsStore = defineStore("rooms", () => {
  const currentRoom = ref(null);
  const isModalOpen = ref(false);

  function selectRoom(room) {
    currentRoom.value = {
      id: room.id,
      name: room.name,
      type: room.type,
      info: room.info,
    };
  }

  function openModal() {
    isModalOpen.value = true;
  }

  function deselectRoom() {
    currentRoom.value = null;
    isModalOpen.value = false;
    document.body.classList.remove("has-scroll");
  }

  return { currentRoom, isModalOpen, selectRoom, openModal, deselectRoom };
});
