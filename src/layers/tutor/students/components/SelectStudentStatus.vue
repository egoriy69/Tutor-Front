<template>
  <Select v-model="model" :options="options" optionLabel="name" name="status" optionValue="value" :class="$style.select"
    fluid />
</template>

<script setup lang='ts'>
import { ActiveStatus, } from '@/app/enums/ActiveStatus';
import { Select } from 'primevue';
import { ref, } from 'vue';

const options = ref([
  { name: 'Активный', value: ActiveStatus.ACTIVE },
  { name: 'Неактивный', value: ActiveStatus.NONACTIVE },
]);
const model = defineModel()

</script>

<style module>
</style>
