<script setup lang="ts">
import MainLayout from './app/layouts/MainLayout.vue';
import logo from '@/app/assets/images/logo/logo-white.png'
import { useFavicon } from '@vueuse/core'

useFavicon(logo,{
  rel: 'icon',
})
</script>
<template>
  <MainLayout>
    <RouterView />
  </MainLayout>
</template>

<style scoped>
.wrapper {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
