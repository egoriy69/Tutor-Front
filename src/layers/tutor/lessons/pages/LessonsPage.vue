<template>
  <div :class='$style.wrapper'>
    <Button as="router-link" label="Создать урок" :to="{ name: 'lessonsForm' }" />

    <DataTable :value="data?.lessonsList" paginator :rows="size" tableStyle="min-width: 50rem" :class="$style.table"
      :dataKey="(student) => student.id" :rowsPerPageOptions="[5, 10, 20]" :totalRecords="data?.totalElements"
      @update:rows="(e) => size = e" v-on:page="(e) => page = e.page" :lazy="true"
      @row-click="(e) => $router.push({ name: 'lessonsForm', params: { id: e.data.id } })">
      <Column field="fullName" header="Ученик" style="width: 30%"></Column>
      <Column field="date" header="Дата" style="width: 20%">
        <template #body="slotProps">
          {{ slotProps.data.date&&new Date(slotProps.data.date).toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute:'2-digit'}) }}
        </template>
      </Column>
      <Column field="categoryName" header="Категория" style="width: 20%"></Column>
      <Column field="cost" header="Стоимость" style="width: 10%;text-align: center;"></Column>
      <Column field="paid" header="Оплачен" style="width: 10%;text-align: center;">
        <template #body="slotProps">
          <BaseCheckbox v-model="slotProps.data.paid" style="display: flex;justify-content: center;"/>
        </template></Column>
      <Column field="homeWork" header="Задание" style="width: 20%;text-align: center;"></Column>
    </DataTable>
  </div>
  <RouterView />
</template>

<script setup lang='ts'>
import { useQuery } from '@tanstack/vue-query';

import { Button, Column, DataTable } from 'primevue';
import { ref, } from 'vue';

import { lessonsService } from '../lessonsService';
import BaseCheckbox from '@/app/components/UI/BaseCheckbox.vue';




const page = ref(0)
const size = ref(10)
const { data } = useQuery({ queryKey: ['lessons', size, page], queryFn: () => lessonsService.getLessons({ page: page.value, size: size.value }) })

</script>

<style module>
.wrapper {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;

  &>a {
    width: fit-content;
    color: var(--ui-button-primary-color);
  }


}

.table {
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 2px var(--gray-text);

  & tr {
    cursor: pointer;
  }
}

:global(.p-datatable-column-title) {
  width: 100%;
}

.selectBtn {
  width: fit-content;
}
</style>
