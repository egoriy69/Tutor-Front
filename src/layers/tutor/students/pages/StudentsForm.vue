<template>
  <Dialog modal :header="isCreateForm ? 'Создать студента' : 'Редактировать студента'" v-model:visible="visible"
    v-on:hide="$router.go(-1)" :dismissableMask="true" :class="$style.wrapper">
    <Form v-slot="$form" :class="$style.form" :validateOnValueUpdate="true" :resolver @submit="onFormSubmit"
      autocomplete="off">
      <InputWithError :form="$form" name="lastName" label="Фамилия*" v-model="formState.lastName" />
      <InputWithError :form="$form" name="firstName" label="Имя*" v-model="formState.firstName" />
      <InputWithError :form="$form" name="email" label="Электронная почта*" v-model="formState.email" />
      <div style="min-height: 63px;">
        <FloatLabel>
          <InputText name="grade" v-keyfilter="{ pattern: /^(11|10|[0-9])?$/, validateOnly: true }"
            v-model="formState.grade" />
          <label for="grade">Класс</label>
        </FloatLabel>
      </div>
      <FloatLabel v-if="$route.query.status ===  ActiveStatus.NONACTIVE||$route.query.status ===  ActiveStatus.ACTIVE">
        <SelectStudentStatus v-model="formState.active" />
        <label for="status">Статус</label>
      </FloatLabel>
      <BaseCheckbox v-if="isCreateForm" name="sendMail" label="Отправить письмо для регистрации"
        v-model="formState.sendMail" />
      <LoadingButton type="button" label="Отправить повторный запрос на регистрацию" variant="outlined"
        v-if="$route.query.status === ActiveStatus.REQUEST" severity="contrast"
        @click.stop="studentsPageService.repeatRequestRegistration(Number($route.params.id))" />
      <Button type="submit" :label="isCreateForm ? 'Создать' : 'Редактировать'" />
      <Button label="Удалить" v-if="!isCreateForm" severity="danger" variant="outlined" @click="handleDelete" />
    </Form>
  </Dialog>
</template>

<script setup lang='ts'>
import { Form, type FormSubmitEvent } from '@primevue/forms';
import { Button, Dialog, FloatLabel, InputText } from 'primevue';
import { computed, ref } from 'vue';
import type { Student } from '../StudentsPageTypes';
import { studentsPageService } from '../studentsPageService';
import InputWithError from '@/app/components/InputWithError.vue';
import { existValidation } from '@/app/utils/validation';
import { useQueryClient } from '@tanstack/vue-query';
import { useAutoQuery } from '@/app/composables/useAutoQuery';
import { useRoute, useRouter } from 'vue-router';
import LoadingButton from '@/app/components/LoadingButton.vue';
import { ActiveStatus } from '@/app/enums/ActiveStatus';
import BaseCheckbox from '@/app/components/UI/BaseCheckbox.vue';
import SelectStudentStatus from '../components/SelectStudentStatus.vue';


const visible = ref(true);
const queryClient = useQueryClient()
type Errors = {
  firstName: Array<object>
  lastName: Array<object>
  email: Array<object>
}

const route = useRoute()
const formState = ref<Student>({
  firstName: '',
  lastName: '',
  email: '',
  grade: '',
  active: (route.query.status as string) || null,
  sendMail: false
});

const router = useRouter()
const isCreateForm = computed(() => !!!route.params.id)
useAutoQuery(formState, { queryKey: ['studentInfo'], queryFn: () => studentsPageService.getStudentInfo(Number(route.params.id)), retry: 1, enabled: !!route.params.id, gcTime: 0 })
//trigger to call authenticate function
//form validation
const resolver = () => {
  const errors: Errors = {
    lastName: existValidation(formState.value?.lastName, 'Введите фамилию'),
    firstName: existValidation(formState.value?.firstName, 'Введите имя'),
    email: existValidation(formState.value?.firstName, 'Введите электронную почту'),
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
  if (e.valid) {
    if (isCreateForm.value) {
      studentsPageService.createStudent({ e, queryClient, router })
    } else {
      e.values.id = route.params.id
      studentsPageService.updateStudent({ e, queryClient, router })
    }
  }
};
const handleDelete = () => {
  studentsPageService.deleteStudent({ id: Number(route.params.id), queryClient, router })
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
  flex-direction: column;
  gap: 15px;
}

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
