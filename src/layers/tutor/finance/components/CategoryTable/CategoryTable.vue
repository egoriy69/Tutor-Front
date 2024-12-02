<template>
  <div :class='$style.wrapper'>
    <SelectCategoryPeriod v-model="range" />
    <Button as="router-link" label="Создать категорию" :to="{ name: 'categoryForm' }" />
    <DataTable :value="data" :class="$style.table" :dataKey="(category) => category.id" :lazy="true"
      @row-click="(e) => ![1, 2, 3].includes(e?.data?.id) && $router.push({ name: 'categoryForm', params: { id: e.data?.id } })"
      :rowStyle="(data) => ![1, 2, 3].includes(data?.id) ? { cursor: 'pointer', } : { backgroundColor: 'var(--frame)' }">
      <Column field="status" style="width: 5%;text-align: center; padding: 0.5rem;">
        <template #header>
          <i class="pi pi-arrow-up-left" />
        </template>
        <template #body="{ data }">
          <CategoryArrows :status="data.status"/>
        </template>
      </Column>
      <Column field="name" header="Категория" style="width: 75%"></Column>
      <Column field="resultSum" style="width: 20%;text-align: center;" />
    </DataTable>
  </div>
  <RouterView />
</template>

<script setup lang='ts'>
import { useQuery } from '@tanstack/vue-query';
import { categoryService } from '../../services/categoryService';
import { Button, Column, DataTable } from 'primevue';
import SelectCategoryPeriod from '../SelectPeriod.vue';
import { ref } from 'vue';
import CategoryArrows from '../CategoryArrows.vue';

const range = ref([])
const { data } = useQuery({ queryKey: ['categories', range], queryFn: () => categoryService.getCategories(range.value[0], range.value[1]) })
</script>

<style module>
.wrapper {
  background-color: transparent;
  /* flex: 1 1 0; */
  flex-grow: 1;
  min-width: 300px;


  &>a {
    background-color: transparent;
    color: var(--ui-primary-400);
    border: none;

    &:hover {
      color: var(--ui-primary-600);
    }
  }

  & i {
    font-size: 1rem;
  }
}

.table {
  font-size: 0.8rem;

  & {
    --ui-datatable-header-cell-background: transparent;
    --ui-datatable-body-cell-border-color: transparent;
    --ui-datatable-row-background: transparent
  }

  & :global(.p-datatable-column-title) {
    font-weight: 600;
  }
}
</style>
