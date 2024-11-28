<template>
  <div :class="$style.wrapper">
    <Select v-model="model" :options="options" optionLabel="name" name="categoryId"  optionValue="value" :class="$style.select"/>
    <RangeDatePicker v-model="model" />
  </div>
</template>

<script setup lang='ts'>
import RangeDatePicker from '@/app/components/RangeDatePicker.vue';
import { Select } from 'primevue';
import { ref, } from 'vue';

const options = ref([
  { name: 'За неделю', value: [new Date(new Date().setDate(new Date().getDate() - 7)), new Date()] },
  { name: 'За месяц', value: [new Date(new Date().setMonth(new Date().getMonth() - 1)), new Date()] },
  { name: 'За год', value: [new Date(new Date().setFullYear(new Date().getFullYear() - 1)), new Date()] },
]);
const model = defineModel<(Date | null)[]>()

</script>

<style module>
.wrapper{
  display: flex;
  gap: 10px;
}
.select{
  width: 100%;
  max-width: 150px;
}
</style>
