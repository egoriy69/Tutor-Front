<template>
  <div class='wrapper'>
    <Transition name="slide-up">
      <Button icon="pi pi-check" v-if="loading" label="" severity="success" variant="outlined"
        style="pointer-events: none;" />
      <Button @mousedown="load" v-bind="$attrs" v-else />
    </Transition>
  </div>
</template>

<script setup lang='ts'>
import { Button } from 'primevue';
import { ref } from 'vue';

const loading = ref(false);

const load = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 2000);
};

</script>

<style scoped>
.wrapper {
  height: 40px;

  &>button {
    width: 100%;
  }

  .slide-up-enter-active,
  .slide-up-leave-active {
    transition: all 0.25s;
  }

  .slide-up-enter-from {
    opacity: 0;
    transform: translateY(30px);
  }

  .slide-up-leave-to {
    opacity: 0;
    transform: translateY(-30px);
  }
}
</style>
