<template>
  <DatePicker v-model="model" selectionMode="range" :manualInput="false" :showIcon="modelValue && modelValue.length > 0"
    iconDisplay="input" :class="$style.datePicker" placeholder="От - До" :hideOnRangeSelection="true">
    <template #inputicon>
      <i class="pi pi-times" @click="$emit('update:modelValue', [])" />
    </template>
  </DatePicker>
</template>

<script setup lang='ts'>
import { DatePicker } from 'primevue';


const model = defineModel<(Date | null)[]>()
</script>

<style module>
.datePicker {
  width: 100%;
  max-width: 300px;

  &>span {
    top: 45%;

    &>i {
      font-size: 16px;
    }
  }
}
</style>
