<template>
  <div class="professors-wrapper">
    <Professor
      v-for="professor in professorsData"
      :key="professor.name"
      :info="professor"
    />
  </div>
</template>

<script setup>
import Professor from "@/components/Professor.vue";
import { computed } from "vue";
import { useGeneralStore } from "@/stores/general_store";

const generalStore = useGeneralStore();
const professorsData = computed(() => generalStore.professors || []);
</script>
