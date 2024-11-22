<template>
  <FloatLabel>
    <Select v-model="model" editable :options="durationOptions" optionLabel="name" name="duration" fluid optionValue="value" />
    <label for="duration">Длительность</label>
  </FloatLabel>
</template>

<script setup lang='ts'>
import { FloatLabel, Select } from 'primevue';
import { ref } from 'vue';

const durationOptions = ref([
  { name: '30', value: '30' },
  { name: '45', value: '45' },
  { name: '60', value: '60' },
  { name: '90', value: '90' },

]);
const model = defineModel()
</script>

<style module>

</style>
