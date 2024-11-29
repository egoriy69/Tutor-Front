<template>
  <BaseHeader>
    <RouterLink :to="{ name: 'lessons' }">Уроки</RouterLink>
    <RouterLink :to="{ name: 'finance' }">Финансы</RouterLink>
    <RouterLink :to="{ name: 'students' }">Ученики</RouterLink>
  </BaseHeader>
</template>

<script setup lang='ts'>
import BaseHeader from '@/app/components/BaseHeader.vue';


</script>

<style module>

</style>
