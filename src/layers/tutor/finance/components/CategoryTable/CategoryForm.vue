<template>
  <Dialog modal :header="isCreateForm ? 'Создать категорию' : 'Редактировать категорию'" v-model:visible="visible"
    v-on:hide="$router.go(-1)" :dismissableMask="true" :class="$style.wrapper">
    <Form v-slot="$form" :class="$style.form" :validateOnValueUpdate="true" :resolver @submit="onFormSubmit">
      <InputWithError :form="$form" name="name" label="Название*" v-model="formState.name" />
      <SelectButton v-model="formState.status" :options="options" optionValue="value" optionLabel='name' dataKey="name"/>
      <Button type="submit" :label="isCreateForm ? 'Создать' : 'Редактировать'" />
      <Button label="Удалить" v-if="!isCreateForm" severity="danger" variant="outlined" @click="handleDelete" />
    </Form>
  </Dialog>
</template>

<script setup lang='ts'>
import { Form, type FormSubmitEvent } from '@primevue/forms';
import { Button, Dialog, SelectButton, } from 'primevue';
import { computed, ref } from 'vue';
import InputWithError from '@/app/components/InputWithError.vue';
import { useQueryClient } from '@tanstack/vue-query';
import { useAutoQuery } from '@/app/composables/useAutoQuery';
import { useRoute, useRouter } from 'vue-router';
import type { Category } from '../../FinanceTypes';
import { categoryService } from '../../services/categoryService';
import { existValidation } from '@/app/utils/validation';


const options = ref([
  { name: 'Расходы', value: false },
  { name: 'Доходы', value: true },
]);
const visible = ref(true);
const queryClient = useQueryClient()
type Errors = {
  name: Array<object>

}

const formState = ref<Category>({
  name: '',
  status: false,
});
const route = useRoute()
const router = useRouter()
const isCreateForm = computed(() => !!!route.params.id)
useAutoQuery(formState, { queryKey: ['studentInfo'], queryFn: () => categoryService.getCategoryInfo(Number(route.params.id)), retry: 1, enabled: !!route.params.id, gcTime: 0 })
//trigger to call authenticate function
//form validation
const resolver = () => {
  const errors: Errors = {
    name: existValidation(formState.value?.name, 'Введите название'),
  };
  return {
    values: formState.value,
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
    if (isCreateForm.value) {
      categoryService.createCategory(e, queryClient, router)
    } else {
      e.values.id = route.params.id
      categoryService.updateCategory(e, queryClient, router)
    }
  }
};
const handleDelete = () => {
  categoryService.deleteCategory(Number(route.params.id), queryClient, router)
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
