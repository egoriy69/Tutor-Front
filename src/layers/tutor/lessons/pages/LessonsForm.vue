<template>
  <Dialog modal :header="isCreateForm ? 'Создать урок' : 'Редактировать урок'" v-model:visible="visible"
    v-on:hide="$router.go(-1)" :dismissableMask="true" :class="$style.wrapper">
    <Form :class="$style.form" :validateOnValueUpdate="true" :resolver @submit="onFormSubmit">
      <FloatLabel>
        <InputNumber v-model="formState.cost" inputId="cost" fluid />
        <label for="cost">Цена</label>
      </FloatLabel>
      <DurationSelect v-model="formState.duration" />
      <FloatLabel>
        <InputText v-model="formState.miroLink" name="miroLink" fluid />
        <label for="miroLink">Ссылка на миро</label>
      </FloatLabel>
      <CategorySelect v-model="formState.categoryId" />
      <HomeWorkSelect v-model="formState.homeWork" />
      <StudentsSelect v-model="formState.studentId" />
      <FloatLabel>
        <Textarea v-model="formState.shortDescription" name="shortDescription" :rows="5" fluid style="resize: none" />
        <label for="shortDescription">Краткое описание</label>
      </FloatLabel>
      <DatePicker v-model="formState.date" showTime hourFormat="24" fluid />
      <BaseCheckbox v-model="formState.paid" name="paid" label="Оплачен" />
      <Button type="submit" :label="isCreateForm ? 'Создать' : 'Редактировать'" />
      <Button label="Удалить" v-if="!isCreateForm" severity="danger" variant="outlined" @click="handleDelete" />
    </Form>
  </Dialog>
</template>

<script setup lang='ts'>
import { Form, type FormSubmitEvent } from '@primevue/forms';
import { Button, DatePicker, Dialog, FloatLabel, InputNumber, InputText, Textarea } from 'primevue';
import { computed, ref } from 'vue';


import { useQueryClient } from '@tanstack/vue-query';
import { useAutoQuery } from '@/app/composables/useAutoQuery';
import { useRoute, useRouter } from 'vue-router';

import { lessonsService } from '../lessonsService';
import type { Lesson } from '../LessonsTypes';
import DurationSelect from '../components/DurationSelect.vue';
import CategorySelect from '../components/CategorySelect.vue';
import HomeWorkSelect from '../components/HomeWorkSelect.vue';
import { LessonStatus } from '@/app/enums/LessonStatus';
import StudentsSelect from '../components/StudentsSelect.vue';
import { existValidation } from '@/app/utils/validation';
import BaseCheckbox from '@/app/components/UI/BaseCheckbox.vue';


const visible = ref(true);
const queryClient = useQueryClient()
const route = useRoute()
const router = useRouter()
const isCreateForm = computed(() => !!!route.params.id)
const formState = ref<Lesson>({
  duration: null,
  miroLink: '',
  shortDescription: '',
  cost: null,
  categoryId: 1,
  studentId: null,
  homeWork: LessonStatus.UNDONE,
  paid: false,
  date: null
});
useAutoQuery(formState, { queryKey: ['lessonInfo'], queryFn: () => lessonsService.getLessonInfo(Number(route.params.id)), retry: 1, enabled: !!route.params.id, gcTime: 0 })
//trigger to call authenticate function
//form validation
const resolver = () => {
  const errors: { studentId: Array<object> } = {
    studentId: existValidation(formState.value?.studentId, 'Выберите студента'),
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
      lessonsService.createLesson({ e, queryClient, router })
    } else {
      e.values.id = route.params.id
      lessonsService.updateLesson({ e, queryClient, router })
    }
  }
};
const handleDelete = () => {
  lessonsService.deleteLesson({ id: Number(route.params.id), queryClient, router })
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
  gap: 20px;
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
