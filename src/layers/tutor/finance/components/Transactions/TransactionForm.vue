<template>
  <Dialog modal :header="isCreateForm ? 'Создать транзакцию' : 'Редактировать транзакцию'" v-model:visible="visible"
    v-on:hide="$router.go(-1)" :dismissableMask="true" :class="$style.wrapper">
    <Form v-slot="$form" :class="$style.form" :validateOnValueUpdate="true" :resolver @submit="onFormSubmit"  autocomplete="off">
      <InputWithError :form="$form" name="name" label="Название*" v-model="formState.name" style="min-height: 42px;" />
      <FloatLabel>
        <InputNumber v-model="formState.cost" inputId="cost" fluid />
        <label for="cost">Цена</label>
      </FloatLabel>
      <AllCategoriesSelect v-model="formState.categoryId" />
      <FloatLabel style="height: fit-content;">
        <DatePicker v-model="formState.createdAt" dateFormat="dd.mm.yy" showIcon hourFormat="24" fluid
          inputId="over_label" :manualInput="true" />
        <label for="over_label">Дата</label>
      </FloatLabel>

      <Button type="submit" :label="isCreateForm ? 'Создать' : 'Редактировать'" />
      <Button label="Удалить" v-if="!isCreateForm" severity="danger" variant="outlined" @click="handleDelete" />
    </Form>
  </Dialog>
</template>

<script setup lang='ts'>
import { Form, type FormSubmitEvent } from '@primevue/forms';
import { Button, DatePicker, Dialog, FloatLabel, InputNumber, } from 'primevue';
import { computed, ref } from 'vue';
import InputWithError from '@/app/components/InputWithError.vue';
import { useQueryClient } from '@tanstack/vue-query';
import { useAutoQuery } from '@/app/composables/useAutoQuery';
import { useRoute, useRouter } from 'vue-router';
import type { Transaction } from '../../FinanceTypes';
import { existValidation } from '@/app/utils/validation';
import AllCategoriesSelect from './AllCategoriesSelect.vue';
import { transactionService } from '../../services/transactionService';



const visible = ref(true);
const queryClient = useQueryClient()
type Errors = {
  name: Array<object>

}

const formState = ref<Transaction>({
  name: '',
  cost: 0,
  categoryId: 1,
  createdAt: null
});
const route = useRoute()
const router = useRouter()
const isCreateForm = computed(() => !!!route.params.id)
useAutoQuery(formState, { queryKey: ['studentInfo'], queryFn: () => transactionService.getTransactionInfo(Number(route.params.id)), retry: 1, enabled: !!route.params.id, gcTime: 0 })
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
      transactionService.createTransaction(e, queryClient, router)
    } else {
      e.values.id = route.params.id
      transactionService.updateTransaction(e, queryClient, router)
    }
  }
};
const handleDelete = () => {
  transactionService.deleteTransaction(Number(route.params.id), queryClient, router)
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
  gap: 30px;
  flex-direction: column;
}
</style>
