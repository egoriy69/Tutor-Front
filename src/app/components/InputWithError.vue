<template>
  <div :class="$style.inputWrapper">
    <FloatLabel :name="name">
      <Password v-if="password" type="text" :name="name" :feedback="false" toggleMask fluid v-model="model" />
      <InputMask v-else-if="mask" v-model="model" :name="name" :mask="mask" />
      <InputText v-else type="text" :name="name" v-model="model" />
      <label :for="name">{{ label }}</label>
    </FloatLabel>
    <Message severity="error" size="small" variant="simple">{{ (form as
      any)[name]?.error?.message }}
    </Message>
  </div>
</template>

<script setup lang='ts'>
import type { FormPassThroughOptionType } from '@primevue/forms';
import { FloatLabel, InputMask, InputText, Message, Password } from 'primevue';

const { form, name, mask, label, password } = defineProps<{
  form: FormPassThroughOptionType
  name: string
  label?: string
  password?: boolean
  mask?: string
}>()
const model = defineModel<string>()

</script>

<style module>
.inputWrapper {
  min-height: 63px;

  &>span>div>svg {
    cursor: pointer;
  }

  & :global(.p-message-text) {
    margin-left: 5px;
  }
}
</style>
