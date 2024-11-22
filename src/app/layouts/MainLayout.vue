<template>
  <div :class='$style.wrapper' class="!transition-all">
    <slot />
  </div>
</template>

<script setup lang='ts'>
import { useDark } from '@vueuse/core';

useDark()
</script>

<style module>
.wrapper {
  width: 100%;
  min-height: 100vh;
  height: 100%;
  background-color: var(--background);
  transition: background-color .4s;

}
</style>
