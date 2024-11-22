<script setup lang="ts">
import MainLayout from './app/layouts/MainLayout.vue';
import logoBlack from '@/app/assets/images/logo-black.png'
import logoWhite from '@/app/assets/images/logo-cutted.png'
import { usePreferredDark } from '@vueuse/core'
const isDark = usePreferredDark()
import { useFavicon } from '@vueuse/core'
import { computed} from 'vue';

const favicon = computed(() => isDark.value ? logoWhite : logoBlack)
useFavicon(favicon,{
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
