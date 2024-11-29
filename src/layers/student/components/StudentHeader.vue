<template>
  <BaseHeader>
    <RouterLink :to="{ name: 'studentLessons' }">Уроки</RouterLink>
  </BaseHeader>
</template>

<script setup lang='ts'>
import BaseHeader from '@/app/components/BaseHeader.vue';


</script>

<style module>
.wrapper {
  background-color: transparent;
}
</style>
