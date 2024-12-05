<template>
  <Dialog modal header="Профиль" v-model:visible="model" :dismissableMask="true" :class="$style.wrapper">
    <Form v-slot="$form" :class="$style.form" :validateOnValueUpdate="true" :resolver @submit="onFormSubmit">
      <InputWithError :form="$form" name="lastName" label="Фамилия*" v-model="formState.lastName" />
      <InputWithError :form="$form" name="firstName" label="Имя*" v-model="formState.firstName" />
      <InputWithError :form="$form" name="email" label="Электронная почта*" v-model="formState.email" />
      <Button type="submit" label="Редактировать" />
    </Form>
  </Dialog>
</template>

<script setup lang='ts'>
import { Form, type FormSubmitEvent } from '@primevue/forms';
import { Button, Dialog, } from 'primevue';

import InputWithError from '@/app/components/InputWithError.vue';


import { existValidation } from '@/app/utils/validation';
import { useUserStore } from '../stores/userStore';
import { ref, watch } from 'vue';


const emit = defineEmits<{
  (e: 'update:modelValue', payload: boolean): void
}>();

const model = defineModel<boolean | undefined>()

type Errors = {
  firstName: Array<object>
  lastName: Array<object>
  email: Array<object>
}
const userStore = useUserStore()
const formState = ref({
  lastName: JSON.parse(JSON.stringify(userStore.user.lastName)),
  firstName: JSON.parse(JSON.stringify(userStore.user.firstName)),
  email: JSON.parse(JSON.stringify(userStore.user.email)),
})
watch(model,()=>{
  formState.value.email = JSON.parse(JSON.stringify(userStore.user.email))
  formState.value.firstName = JSON.parse(JSON.stringify(userStore.user.firstName))
  formState.value.lastName = JSON.parse(JSON.stringify(userStore.user.lastName))
})

//trigger to call authenticate function
//form validation
const resolver = () => {
  const errors: Errors = {
    firstName: existValidation(formState.value.lastName, 'Введите имя'),
    lastName: existValidation(formState.value.firstName, 'Введите фамилию'),
    email: existValidation(formState.value.email, 'Введите электронную почту'),
  };
  return {
    values: {
      email: formState.value.email,
      firstName: formState.value.firstName,
      lastName: formState.value.lastName
    },
    errors: errors
  };
}

const onFormSubmit = async (e: FormSubmitEvent) => {
  // e.originalEvent: Represents the native form submit event.
  // e.valid: A boolean that indicates whether the form is valid or not.
  // e.states: Contains the current state of each form field, including validity status.
  // e.errors: An object that holds any validation errors for the invalid fields in the form.
  // e.values: An object containing the current values of all form fields.
  // e.reset: A function that resets the form to its initial state.
  if (e.valid) {
    userStore.updateUserServerData(e, () => emit('update:modelValue', false))
  }
}


</script>

<style module>
.wrapper {
  background-color: var(--frame);
  min-width: 500px;

}

.form {
  margin-top: 15px;
  display: flex;
  gap: 15px;
  flex-direction: column;
}
</style>
