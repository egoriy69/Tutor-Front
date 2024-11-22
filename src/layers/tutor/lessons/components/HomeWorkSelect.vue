<template>
  <FloatLabel>
    <Select v-model="model" :options="homeWorkOptions" optionLabel="name" name="homeWork" fluid optionValue="value" />
    <label for="homeWork">Домашнее задание</label>
  </FloatLabel>
</template>

<script setup lang='ts'>
import { homeWork, LessonStatus } from '@/app/enums/LessonStatus';
import { FloatLabel, Select } from 'primevue';
import { ref } from 'vue';

const homeWorkOptions = ref([
  { name: homeWork.UNDONE, value: LessonStatus.UNDONE },
  { name: homeWork.PROCESSING, value: LessonStatus.PROCESSING },
  { name: homeWork.DONE, value: LessonStatus.DONE },
  { name: homeWork.REMAKE, value: LessonStatus.REMAKE },
  { name: homeWork.FINISH, value: LessonStatus.FINISH },
]);
const model = defineModel()
</script>

<style module></style>
