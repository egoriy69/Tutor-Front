<template>
  <FloatLabel>
    <Select v-model="model" :options="studentsOptions" optionLabel="name" name="studentId" fluid optionValue="value" />
    <label for="studentId">Ученик</label>
  </FloatLabel>
</template>

<script setup lang='ts'>
import { useQuery } from '@tanstack/vue-query';
import { FloatLabel, Select } from 'primevue';
import { ref, watchEffect, } from 'vue';
import { lessonsService } from '../lessonsService';

const { data } = useQuery({ queryKey: ['studentList'], queryFn: lessonsService.getListOfStudents })
const studentsOptions = ref([]);
watchEffect(() => {
  if (data.value) {
    studentsOptions.value = data.value.map((el: { fullName: string, id: number }) => {
      return { name: el.fullName, value: el.id }
    })
  }
});

const model = defineModel()

</script>

<style module></style>
