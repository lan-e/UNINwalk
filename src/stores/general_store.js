import { defineStore } from "pinia";
import { ref } from "vue";

export const useGeneralStore = defineStore("general_store", () => {
  const professors = ref([]);
  const uninData = ref([]);

  return {
    professors,
    uninData,
  };
});
