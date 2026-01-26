import { defineStore } from "pinia";
import { ref } from "vue";
import { useGeneralStore } from "./general_store";

export const useRoomsStore = defineStore("rooms", () => {
  const rooms = ref([]);
  const currentRoom = ref(null);
  const isModalOpen = ref(false);
  const professorsInRoom = ref([]);
  const savedScrollPosition = ref(null); // track if scroll was saved

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

  // NEW: Shared function for handling room selection
  function handleRoomSelection(roomId, route, router) {
    const success = selectRoom(roomId);

    if (success) {
      if (route) {
        // Route change - scroll after navigation
        router.push(route).then(() => {
          scrollToRoom(roomId);
        });
      } else {
        // no route change - scroll first, wait for animation, then open modal
        scrollToRoom(roomId);
        openModal();
      }
    } else {
      console.error("Room not found:", roomId);
    }
  }

  // Handle router link click
  function handleRouterLinkClick(e, router) {
    if (e.target.classList.contains("router-link")) {
      const route = e.target.getAttribute("data-route");
      const room = e.target.getAttribute("data-room");

      if (room) {
        handleRoomSelection(room, route, router);
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

  // scrolls to the selected room only if needed
  function scrollToRoom(roomId) {
    // wait for next tick to ensure DOM is updated
    setTimeout(() => {
      const roomElement = document.querySelector(`[id="room-k${roomId}"]`);

      if (roomElement) {
        const rect = roomElement.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // check if room is already visible in viewport
        const isVisible = rect.top >= 0 && rect.bottom <= viewportHeight;

        // only scroll if room is not fully visible
        if (!isVisible) {
          roomElement.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }
    }, 100); // small delay to ensure navigation and rendering is complete
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
      // save current scroll position
      const scrollY = window.scrollY;
      savedScrollPosition.value = scrollY;
      document.body.style.top = `-${scrollY}px`;
      document.body.classList.add("has-scroll");
    }
  }

  function deselectRoom() {
    currentRoom.value = null;
    closeModal();
  }

  function closeModal() {
    isModalOpen.value = false;

    // only restore scroll if it was actually saved
    if (savedScrollPosition.value !== null) {
      document.body.classList.remove("has-scroll");
      document.body.style.top = "";
      window.scrollTo(0, savedScrollPosition.value);
      savedScrollPosition.value = null;
    } else {
      // remove the class if no scroll was saved
      document.body.classList.remove("has-scroll");
      document.body.style.top = "";
    }
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
    scrollToRoom,
    handleRoomSelection,
  };
});
