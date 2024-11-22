<template>
  <div :class="$style.wrapper">
    <Form v-slot="$form" :initialValues :validateOnValueUpdate="true" :resolver @submit="onFormSubmit"
      >
      <h2>Авторизация</h2>
      <InputWithError :form="$form" name="email" label="Электронная почта*" />
      <InputWithError :form="$form" name="password" label="Пароль*" :password="true" />
      <Button type="submit" label="Войти" />
      <RouterLink :to="{ name: 'reset' }" :class="$style.reset">Забыли пароль?</RouterLink>
      <RouterLink :to="{ name: 'reg' }" :class="$style.reset">Регистрация</RouterLink>
    </Form>
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import { Form, type FormResolverOptions, type FormSubmitEvent } from '@primevue/forms';
import { Button } from 'primevue';
import type { LoginData } from '../AuthTypes';
import { authService } from '../authService';
import { passwordLoginValidation } from '../utils/validation';
import InputWithError from '../../../app/components/InputWithError.vue';
import { existValidation } from '@/app/utils/validation';

type Errors = {
  email: Array<object>
  password: Array<object>
}
//form initialValues
const initialValues = ref<LoginData>({
  email: '',
  password: ''
});
//trigger to call authenticate function
//form validation
const resolver = ({ values }: FormResolverOptions) => {
  const errors: Errors = {
    email: existValidation(values.email, 'Введите электронную почту'),
    password: passwordLoginValidation(values.password),
  };
  return {
    values,
    errors
  };
}

const onFormSubmit = async (e: FormSubmitEvent) => {
  // e.originalEvent: Represents the native form submit event.
  // e.valid: A boolean that indicates whether the form is valid or not.
  // e.states: Contains the current state of each form field, including validity status.
  // e.errors: An object that holds any validation errors for the invalid fields in the form.
  // e.values: An object containing the current values of all form fields.
  // e.reset: A function that resets the form to its initial state.
  if (e.valid) authService.authenticate(e)
};


</script>


<style module src="./formStyles.module.css"></style>
