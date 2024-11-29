<template>
  <div :class='$style.wrapper'>
    <Form v-slot="$form" :validateOnValueUpdate="true" :resolver @submit="onFormSubmit"
      class="flex flex-col gap-4 w-full sm:w-60">
      <h3>Введите электронную почту<br /> для сброса пароля</h3>
      <InputWithError :form="$form" name="email" label="Электронная почта*" />
      <Button type="submit" label="Отправить" />
      <RouterLink :to="{ name: 'login' }" :class="$style.reset">Вернуться к авторизации</RouterLink>
    </Form>
  </div>
</template>

<script setup lang='ts'>
import { Form, type FormResolverOptions, type FormSubmitEvent } from '@primevue/forms';
import InputWithError from '../../../app/components/InputWithError.vue';
import { Button } from 'primevue';
import { RouterLink } from 'vue-router';
import { authService } from '../authService';
import { existValidation } from '@/app/utils/validation';



//form validation
const resolver = ({ values }: FormResolverOptions) => {
  const errors: { email: Array<object> } = {
    email: existValidation(values.email, 'Введите электронную почту'),
  };
  return {
    values,
    errors
  };
}
const onFormSubmit = async (e: FormSubmitEvent) => {
  if (e.valid) authService.requestReset(e)

};
</script>

<style module src="./formStyles.module.css"></style>
