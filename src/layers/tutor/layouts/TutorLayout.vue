<template>
  <div :class='$style.wrapper'>
    <TutorHeader />
    <RouterView />
  </div>
</template>

<script setup lang='ts'>
import { RouterView } from 'vue-router';
import TutorHeader from '../components/TutorHeader.vue';

</script>

<style module>
.wrapper {
  max-width: 1200px;
  margin: auto;
}
</style>
