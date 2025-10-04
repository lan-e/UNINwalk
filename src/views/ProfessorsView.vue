<template>
  <div class="professors-wrapper">
    <Professor v-for="professor in professorsData" :key="professor.name" :info="professor" />
  </div>
</template>

<script setup>
import Professor from '@/components/Professor.vue';
import { onMounted, ref } from 'vue';
import { fetchProfessorsData } from '@/apiCalls';

const professorsData = ref(null)

onMounted(async() => {
  professorsData.value = await fetchProfessorsData()
})
</script>
