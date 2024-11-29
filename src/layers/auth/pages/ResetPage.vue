<template>
  <div :class='$style.wrapper'>
    <Form v-slot="$form" :validateOnValueUpdate="true" :resolver @submit="onFormSubmit"
      class="flex flex-col gap-4 w-full sm:w-60">
      <h3>Введите новый пароль</h3>
      <InputWithError :form="$form" name="password" label="Пароль*" :password="true" />
      <InputWithError :form="$form" name="confirmPassword" label="Подтверждение пароля*" :password="true" />
      <Button type="submit" label="Отправить" />
      <RouterLink :to="{ name: 'login' }" :class="$style.reset">Вернуться к авторизации</RouterLink>
    </Form>
  </div>
</template>

<script setup lang='ts'>
import { Form, type FormResolverOptions, type FormSubmitEvent } from '@primevue/forms';
import InputWithError from '../../../app/components/InputWithError.vue';
import { Button } from 'primevue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { authService } from '../authService';
import { confirmPasswordRegValidation, passwordRegValidation } from '../utils/validation';


const route = useRoute()
const router = useRouter()
//form validation
const resolver = ({ values }: FormResolverOptions) => {
  const errors: { password: Array<object>, confirmPassword: Array<object> } = {
    password: passwordRegValidation(values?.password),
    confirmPassword: confirmPasswordRegValidation(values?.password, values?.confirmPassword),
  };
  return {
    values,
    errors
  };
}
const onFormSubmit = async (e: FormSubmitEvent) => {
  if (e.valid) authService.reset(e, (route.params?.resetToken as string),router)

};
</script>

<style module src="./formStyles.module.css"></style>
