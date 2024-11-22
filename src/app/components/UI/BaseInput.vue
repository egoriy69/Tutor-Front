<template>
  <FloatLabel>
    <IconField>
      <InputText id="over_label" :name="name" v-model:modelValue="model" autocomplete="off" />
    </IconField>
    <label for="over_label">{{ label }}</label>
  </FloatLabel>
</template>

<script setup lang='ts'>
import { FloatLabel, IconField } from 'primevue';
import type { Nullable } from '@primevue/core';
import InputText from 'primevue/inputtext';


type Props = {
  label?: string
  name: string
}
const { label = '', name = '' } = defineProps<Props>()
const model = defineModel<Nullable<string>>()
</script>

<style module></style>
