import { ref } from 'vue';

const parkingData = {
  p1: { id: 'p1', spots: 70 },
  p2: { id: 'p2', spots: 60 }
};

const availableP1 = ref(randomInitial(parkingData.p1.spots));
const availableP2 = ref(randomInitial(parkingData.p2.spots));

function randomInitial(max) {
  return Math.floor(max * 0.5 + Math.random() * (max * 0.3)); // 50-80% full
}

export function useParking() {
  return {
    parkingData,
    availableP1,
    availableP2
  };
}
