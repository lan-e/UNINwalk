import { defineStore } from "pinia";
import { ref } from "vue";
import { useGeneralStore } from "./general_store";

export const useRoomsStore = defineStore("rooms", () => {
  const rooms = ref([]);
  const currentRoom = ref(null);
  const isModalOpen = ref(false);
  const professorsInRoom = ref([]);

  // find room in the rooms array
  function findRoom(room) {
    for (let section of ["UNIN2-1", "UNIN2-2", "UNIN1-1", "UNIN1-2"]) {
      if (rooms.value[section] && rooms.value[section][`k${room}`]) {
        // return both the room info and the floor name
        return {
          ...rooms.value[section][`k${room}`],
          section: section,
        };
      }
    }
    return null; // return null if room is not found
  }

  // Set room data to the store
  function selectRoom(room) {
    if (typeof room === "string") {
      // If room is a string (room ID), find the room data first
      const roomInfo = findRoom(room);
      if (roomInfo) {
        currentRoom.value = {
          id: roomInfo.id,
          name: roomInfo.name,
          type: roomInfo.type,
          info: roomInfo.info,
          section: roomInfo.section,
        };
        return true;
      }
      return false;
    } else {
      // If room is already an object
      currentRoom.value = {
        id: room.id,
        name: room.name,
        type: room.type,
        info: room.info,
        section: room.section,
      };
      return true;
    }
  }

  // Handle router link click
  function handleRouterLinkClick(e, router) {
    if (e.target.classList.contains("router-link")) {
      const route = e.target.getAttribute("data-route");
      const room = e.target.getAttribute("data-room");

      if (room) {
        const success = selectRoom(room);
        if (success) {
          console.log("Room saved to store:", currentRoom.value);
        } else {
          console.log("Room not found:", room);
        }
      }

      if (route) {
        router.push(route);
      }
    }
  }

  // Setup event listeners
  function setupRoomClickListener(router) {
    const clickHandler = (e) => handleRouterLinkClick(e, router);

    // Add event listener
    document.addEventListener("click", clickHandler);

    // Return a cleanup function for component unmount
    return () => {
      document.removeEventListener("click", clickHandler);
    };
  }

  function openModal() {
    const generalStore = useGeneralStore();

    isModalOpen.value = true;

    professorsInRoom.value = generalStore.professors.filter((professor) => {
      if (!professor.room?.trim()) return false;

      const profRoom = professor.room.toLowerCase().trim();
      const currentRoomId = currentRoom.value.id.toLowerCase().trim();

      // exact match
      if (currentRoomId === profRoom) return true;

      // extract numbers
      const profRoomNum = profRoom.match(/\d+/)?.[0];
      const currentRoomNum = currentRoomId.match(/\d+/)?.[0];

      if (!profRoomNum || !currentRoomNum || profRoomNum !== currentRoomNum)
        return false;

      // professor's room is a number (e.g., "3", "36", "27")
      const profIsJustNumber = /^\d+$/.test(profRoom);

      // current room: letter + optional hyphen + number (e.g., "k3", "k-27")
      const currentIsSimpleRoom = /^[a-z]-?\d+$/.test(currentRoomId);

      // match only if professor has just a number and current room is simple format
      return profIsJustNumber && currentIsSimpleRoom;
    });

    const isScrollable =
      document.documentElement.scrollHeight > window.innerHeight;
    if (isScrollable) {
      document.body.classList.add("has-scroll");
    }
  }

  function deselectRoom() {
    currentRoom.value = null;
    closeModal();
  }

  function closeModal() {
    isModalOpen.value = false;
    document.body.classList.remove("has-scroll");
  }

  return {
    rooms,
    currentRoom,
    isModalOpen,
    professorsInRoom,
    findRoom,
    selectRoom,
    handleRouterLinkClick,
    setupRoomClickListener,
    openModal,
    deselectRoom,
    closeModal,
  };
});
