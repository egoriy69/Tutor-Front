<template>
  <FloatLabel>
    <Select v-model="model" :options="homeWorkOptions" optionLabel="name" name="homeWork" fluid optionValue="value" />
    <label for="homeWork">Домашнее задание</label>
  </FloatLabel>
</template>

<script setup lang='ts'>
import { LessonStatus } from '@/app/enums/LessonStatus';
import { FloatLabel, Select } from 'primevue';
import { ref } from 'vue';

const homeWorkOptions = ref([
  { name: 'Не сделано', value: LessonStatus.UNDONE },
  { name: 'На проверке', value: LessonStatus.PROCESSING },
  { name: 'Сделано', value: LessonStatus.DONE },
  { name: 'Переделать', value: LessonStatus.REMAKE },
  { name: 'Доделано', value: LessonStatus.FINISH },

]);
const model = defineModel()
</script>

<style module>

</style>
