<template>
  <div :class="$style.checkBox" >
    <Checkbox :inputId="name" :name="name" v-model="model" binary v-bind="$attrs"/>
    <label v-if="label" :for="name">{{ label }}</label>
  </div>
</template>

<script setup lang='ts'>
import { Checkbox } from 'primevue';



type Props = {
  name?: string
  label?: string
}
const { name, label } = defineProps<Props>()
const model = defineModel()
</script>

<style module>
.checkBox {
  display: flex;
  align-items: center;
  color: var(--gray-text);

  gap: 10px;

  &>label {
    cursor: pointer;
  }
}
</style>
