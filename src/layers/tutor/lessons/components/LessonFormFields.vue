<template>
  <ul>
    <FloatLabel>
      <InputNumber v-model="formState!.cost" inputId="cost" fluid />
      <label for="cost">Цена</label>
    </FloatLabel>
    <FloatLabel>
      <InputText v-model="formState!.miroLink" name="miroLink" fluid />
      <label for="miroLink">Ссылка на миро</label>
    </FloatLabel>
    <CategorySelect v-model="formState!.categoryId" />
    <HomeWorkSelect v-model="formState!.homeWork" />
    <StudentsSelect v-model="formState!.studentId" v-if="formState!.categoryId === 1" />
    <GroupSelect v-else />
    <FloatLabel name="shortDescription">
      <Textarea v-model="formState!.shortDescription" name="shortDescription" :rows="3" fluid style="resize: none;"
        autocomplete="off" />
      <label for="shortDescription">Краткое описание</label>
    </FloatLabel>
    <div style="display: flex;gap: 10px;">
      <FloatLabel style="height: fit-content;">
        <DatePicker v-model="formState!.date" dateFormat="dd.mm.yy" showIcon hourFormat="24" fluid inputId="over_label" name="date"
          :manualInput="true" />

        <label for="over_label">Дата</label>
      </FloatLabel>
      <TimeRangePicker v-model:startTime="formState!.startTime" v-model:endTime="formState!.endTime" />
    </div>
    <BaseCheckbox v-model="formState!.paid" name="paid" label="Оплачен" />
  </ul>
</template>

<script setup lang='ts'>
import { DatePicker, FloatLabel, InputNumber, InputText, Textarea } from 'primevue';
import { type Lesson } from '../LessonsTypes';
import CategorySelect from './CategorySelect.vue';
import HomeWorkSelect from './HomeWorkSelect.vue';
import StudentsSelect from './StudentsSelect.vue';
import GroupSelect from './GroupSelect.vue';
import BaseCheckbox from '@/app/components/UI/BaseCheckbox.vue';
import TimeRangePicker from '../../components/TimePicker/TimeRangePicker.vue';



const formState = defineModel<Lesson>()

</script>

<style module>
.wrapper {
  background-color: transparent;
}
</style>
