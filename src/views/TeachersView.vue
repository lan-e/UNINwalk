<template>
  <div class="teachers-wrapper">
    <Teacher v-for="teacher in teachers" :key="teacher.name" :info="teacher" />
  </div>
</template>

<script setup>
import Teacher from '@/components/Teacher.vue';
import teacher1Image from '@/assets/images/teacher1.png';
import teacher2Image from '@/assets/images/teacher2.png';
import teacher3Image from '@/assets/images/teacher3.png';

const teachers = [
  {
    "name": "Snježana Ivančić Valenko",
    "title": "viši predavač, dr. sc.",
    "email": "snjezana.ivancic@unin.hr",
    "profile_image": teacher1Image,
    "phone": "042/493-371",
    "web": "https://scholar.google.com/citations?user=iKMgEqoAAAAJ&hl=hr&oi=ao"
  },
  {
    "name": "Jelena Vlašić",
    "title": "predavač, dipl. ing.",
    "email": "jelena.vlasic@unin.hr",
    "profile_image": teacher2Image,
    "phone": "042/493-371",
    "web": "https://scholar.google.hr/citations?user=BqihCmsAAAAJ&hl=hr"
  },
  {
    "name": "Andrija Bernik",
    "title": "docent, dr. sc.",
    "email": "andrija.bernik@unin.hr",
    "profile_image": teacher3Image,
    "web": "https://scholar.google.hr/citations?user=XP-ercgAAAAJ&hl=en&oi=ao"
  }
]
</script>
