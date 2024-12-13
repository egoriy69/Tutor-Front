<template>
  <div :class='$style.wrapper'>
    <StudentsTable />
    <RouterView />
    <GroupsTable />
  </div>
</template>

<script setup lang='ts'>
import { onMounted } from 'vue';
import StudentsTable from '../components/StudentsTable.vue';
import { useRoute, useRouter } from 'vue-router';
import { ActiveStatus } from '@/app/enums/ActiveStatus';
import GroupsTable from '../components/GroupsTable.vue';


const route = useRoute()
const router = useRouter()
onMounted(() => {
  if (!route.query.status){
    router.replace({query:{status:ActiveStatus.ACTIVE}})
  }
})
</script>

<style module>
.wrapper {
  background-color: transparent;
}
</style>
