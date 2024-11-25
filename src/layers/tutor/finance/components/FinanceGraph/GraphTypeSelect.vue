<template>
  <Select v-model="model" :options="typeOptions" optionLabel="name" name="categoryId" fluid optionValue="value" :class="$style.select"/>
</template>

<script setup lang='ts'>
import {  Select } from 'primevue';
import { ref, } from 'vue';

const typeOptions = ref([
  { name: 'По дням', value: 'date' },
  { name: 'По месяцам', value: 'month' },
  { name: 'По годам', value: 'year' },
]);
const model = defineModel()

</script>

<style module>
.select {
  width: 170px;
}
</style>
