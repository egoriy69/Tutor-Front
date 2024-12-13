<template>
  <div :class='$style.wrapper'>
    <TimePicker name="startTime" v-model="startTime" label="От"/>
    <TimePicker name="endTime" v-model="endTime" label="До"/>
  </div>
</template>

<script setup lang='ts'>
import TimePicker from './TimePicker.vue';



  const startTime = defineModel('startTime')
  const endTime = defineModel('endTime')

</script>

<style module>
.wrapper {
  display: flex;
  gap: 10px;
}
</style>
