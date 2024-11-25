<template>
  <div :class='$style.wrapper'>
    <Button as="router-link" label="Создать студента" :to="{ name: 'studentForm' }" />
    <SelectButton v-model="activeStatus" :options="options" :class="$style.selectBtn"
      :optionLabel="(option) => option === ActiveStatus.ACTIVE ? 'Активные' : 'Заявки'" />
    <DataTable :value="data?.studentsList" paginator :rows="size" tableStyle="min-width: 50rem" :class="$style.table"
      :dataKey="(student) => student.id" :rowsPerPageOptions="[5, 10, 20]" :totalRecords="data?.totalElements"
      @update:rows="(e) => size = e" v-on:page="(e) => page = e.page" :lazy="true"
      @row-click="(e) => $router.push({ name: 'studentForm', params: { id: e.data.id }, query: { status: activeStatus } })">
      <Column field="fullName" header="Имя" style="width: 40%"></Column>
      <Column field="grade" header="Класс" style="width: 10%;text-align: center;"></Column>
      <Column field="email" header="Почта" style="width: 30%"></Column>
    </DataTable>
  </div>
  <RouterView />
</template>

<script setup lang='ts'>
import { useQuery } from '@tanstack/vue-query';
import { studentsPageService } from '../studentsPageService';
import { Button, Column, DataTable, SelectButton } from 'primevue';
import { ref,  } from 'vue';
import { ActiveStatus } from '@/app/enums/ActiveStatus';


const activeStatus = ref(ActiveStatus.ACTIVE);
const options = ref([ActiveStatus.ACTIVE, ActiveStatus.REQUEST]);

const page = ref(0)
const size = ref(10)
const { data } = useQuery({ queryKey: ['students', size, page, activeStatus], queryFn: () => studentsPageService.getStudents({ page: page.value, size: size.value, activeStatus: activeStatus.value }) })

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
