<template>
  <FloatLabel>
    <Select v-model="model" :options="categoryOptions" optionLabel="name" name="categoryId" fluid optionValue="value" />
    <label for="categoryId">Категория</label>
  </FloatLabel>
</template>

<script setup lang='ts'>
import { useQuery } from '@tanstack/vue-query';
import { FloatLabel, Select } from 'primevue';
import { ref, watchEffect, } from 'vue';
import { categoryService } from '../../services/categoryService';
import type { Category } from '../../FinanceTypes';



const categoryOptions = ref([
  { name: 'Индивидуальный урок', value: 1 },
  { name: 'Групповое занятие', value: 2 },
  { name: 'Заочное видение', value: 3 },
]);
const { data } = useQuery({ queryKey: ['categories'], queryFn: () => categoryService.getCategories() })
watchEffect(() => {
  if (data) {
    categoryOptions.value = data?.value?.map((el:Category) => ({
      name: el.name,
      value: el.id
    }))
  }
});

const model = defineModel()

</script>

<style module></style>
