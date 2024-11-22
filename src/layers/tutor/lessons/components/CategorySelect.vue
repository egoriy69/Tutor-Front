<template>
  <FloatLabel>
    <Select v-model="model" :options="categoryOptions" optionLabel="name" name="categoryId"  fluid  optionValue="value"/>
    <label for="categoryId">Категория</label>
  </FloatLabel>
</template>

<script setup lang='ts'>
import { FloatLabel, Select } from 'primevue';
import { ref,  } from 'vue';

const categoryOptions = ref([
  { name: 'Индивидуальный урок', value: 1 },
  { name: 'Групповое занятие', value: 2 },
  { name: 'Заочное видение', value: 3 },
]);
const model = defineModel()

</script>

<style module>

</style>
