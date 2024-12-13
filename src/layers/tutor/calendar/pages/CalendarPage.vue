<template>
  <div :class='$style.wrapper'>
    <CalendarTable />
  </div>
</template>

<script setup lang='ts'>
import CalendarTable from '../components/CalendarTable.vue';


</script>

<style module>
.wrapper {
  background-color: transparent;
  padding-top: 20px;
}
</style>
