<template>
  <div :class="$style.wrapper">
    <Form v-slot="$form" :validateOnSubmit="true" :validateOnValueUpdate="true" :resolver @submit="onFormSubmit">
      <h2>Регистрация</h2>
      <InputWithError :form="$form" name="lastName" label="Фамилия*" v-model="formState.lastName" />
      <InputWithError :form="$form" name="firstName" label="Имя*" v-model="formState.firstName" />
      <InputWithError :form="$form" name="email" label="Электронная почта*" v-model="formState.email" />
      <InputWithError :form="$form" name="password" label="Пароль*" :password="true" v-model="formState.password" />
      <InputWithError :form="$form" name="confirmPassword" label="Подтверждение пароля*" :password="true"
        v-model="formState.confirmPassword" />
      <Button type="submit" label="Зарегистрироваться" />
      <RouterLink :to="{ name: 'login' }" :class="$style.reset">Авторизация</RouterLink>
    </Form>
  </div>
</template>

<script setup lang='ts'>
import { Form, type FormSubmitEvent } from '@primevue/forms';
import { Button } from 'primevue';
import { type RegData } from '../AuthTypes';

import { authService } from '../authService';
import { useRoute } from 'vue-router';
import { confirmPasswordRegValidation, passwordRegValidation } from '../utils/validation';
import InputWithError from '../../../app/components/InputWithError.vue';

import { ref } from 'vue';
import { useAutoQuery } from '@/app/composables/useAutoQuery';
import { existValidation } from '@/app/utils/validation';


type Errors = {
  lastName: Array<object>
  firstName: Array<object>
  email: Array<object>
  password: Array<object>
  confirmPassword: Array<object>
}
const route = useRoute()


const formState = ref<RegData>({
  lastName: '',
  firstName: '',
  email: '',
  password: '',
  confirmPassword: '',
});
//auto update formState
useAutoQuery<RegData>(formState, { queryKey: ['regData'], queryFn: () => authService.getRegData(route), retry: 1, enabled: !!route.params.regToken })
//trigger to call authenticate function


//form validation
const resolver = () => {
  const errors: Errors = {
    lastName: existValidation(formState.value?.lastName, 'Введите фамилию'),
    firstName: existValidation(formState.value?.firstName, 'Введите имя'),
    email: existValidation(formState.value?.email, 'Введите электронную почту'),
    password: passwordRegValidation(formState.value?.password),
    confirmPassword: confirmPasswordRegValidation(formState.value?.password, formState.value?.confirmPassword),
  };
  return {
    values: formState.value,
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
  if (e.valid) authService.register({ e, route })
}

</script>

<style module src="./formStyles.module.css"></style>
