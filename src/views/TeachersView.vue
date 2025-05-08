<template>
  <div class="teachers-wrapper">
    <Teacher v-for="teacher in teachersWithImages" :key="teacher.name" :info="teacher" />
  </div>
</template>

<script setup>
import Teacher from '@/components/Teacher.vue';
import teachersData from '@/data/teachers-data.json';
import teacher1Image from '@/assets/images/teacher1.png';
import teacher2Image from '@/assets/images/teacher2.png';
import teacher3Image from '@/assets/images/teacher3.png';

const imageMap = {
  'teacher1.png': teacher1Image,
  'teacher2.png': teacher2Image,
  'teacher3.png': teacher3Image,
};

const teachersWithImages = teachersData.map(teacher => ({
  ...teacher,
  profile_image: imageMap[teacher.image] || '/placeholder.png'
}));
</script>
