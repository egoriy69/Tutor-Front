<template>
  <div :class='$style.wrapper'>
    <SelectCategoryPeriod v-model="range" />
    <Button as="router-link" label="Создать транзакцию" :to="{ name: 'transactionForm' }" />
    <DataTable :value="data?.transactionsList" paginator :rows="size" tableStyle="min-width: 50rem"
      :class="$style.table" :dataKey="(student) => student.id" :rowsPerPageOptions="[5, 10, 20]"
      :totalRecords="data?.totalElements" @update:rows="(e) => size = e" v-on:page="(e) => page = e.page" :lazy="true"
      @row-click="(e) => $router.push({ name: 'transactionForm', params: { id: e.data.id } })"
      :style="{ minHeight: `${49 + 59 + data?.transactionsList.length * 49}px` }">
      <Column field="name" header="Название" style="width: 30%"></Column>
      <Column field="cost" header="Цена" style="width: 20%;text-align: center;"></Column>
      <Column field="categoryName" header="Категория" style="width: 25%">
        <template #body="slotProps">
          <div style="display: flex; align-items: center; gap: 10px;">
            <CategoryArrows :status="slotProps.data.categoryStatus"  style="font-size: 1.2rem;"/>
            {{ slotProps.data.categoryName }}
          </div>
        </template>
      </Column>
      <Column field="createdAt" header="Дата" style="width: 30%">
        <template #body="slotProps">
          {{ dayjs.utc(slotProps.data.createdAt).format('DD.MM.YYYY') }}
        </template>
      </Column>
    </DataTable>
  </div>
  <RouterView />
</template>

<script setup lang='ts'>
import { useQuery } from '@tanstack/vue-query';
import { Button, Column, DataTable } from 'primevue';
import { ref, } from 'vue';
import { transactionService } from '../../services/transactionService';
import SelectCategoryPeriod from '../SelectPeriod.vue';
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import CategoryArrows from '../CategoryArrows.vue';
dayjs.extend(utc);

export type Transaction = {
  id?: number,
  name: string,
  cost: number
  categoryName: string,
  categoryStatus: string
  createdAt: Date | null
}

const range = ref([])
const page = ref(0)
const size = ref(10)
const { data } = useQuery({ queryKey: ['transactions', size, page, range], queryFn: () => transactionService.getTransactions(page.value, size.value, range.value[0], range.value[1]) })

</script>

<style module>
.wrapper {
  margin-top: 70px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  /* align-items: center; */

  &>a {
    background-color: transparent;
    color: var(--ui-primary-400);
    border: none;
    width: fit-content;

    &:hover {
      color: var(--ui-primary-600);
    }
  }

}

.table {
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 2px var(--gray-text);

  & tbody>tr {
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
