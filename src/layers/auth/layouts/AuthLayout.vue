<template>
  <div :class='$style.wrapper'>
    <img src="@/app/assets/images/logo/logo-white.png" />
    <RouterView v-slot="{ Component }">
      <Transition name="auth">
        <Component :is="Component" />
      </Transition>
    </RouterView>
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import { onBeforeRouteUpdate } from 'vue-router';

const toHeight = ref('0px')
const fromHeight = ref('0px')

type RouteName = 'login' | 'reg' | 'requestReset' | 'reset'

const height: Record<RouteName, string> = {
  'login': '380px',
  'reg': '550px',
  'requestReset': '290px',
  'reset': '340px',
}

onBeforeRouteUpdate(async (to, from) => {
  if (to.name && from.name) {
    toHeight.value = height[to.name as RouteName] ?? '0px'
    fromHeight.value = height[from.name as RouteName] ?? '0px'
  }
})
</script>

<style module>
.wrapper {
  margin: 0 auto;
  max-width: 500px;
  padding: 20px 40px;
  border-radius: 20px;
  box-shadow: 0px 0px 5px #cdcdcd;
  position: relative;
  top: 2vh;
  background-color: var(--frame);
  overflow: hidden;
  /* max-height: 900px; */

  &>img {
    margin: auto;
    max-width: 300px;
    font-size: 2rem;
    margin-bottom: 20px;
  }

  --login-height: 380px;
  --reg-height: 550px;
  --requestReset-height: 290px;
  --reset-height: 340px;
}

:global(.auth-enter-active) {
  transition: height .5s, opacity 1s;
  opacity: 1;
  height: v-bind(toHeight);
}

:global(.auth-enter-from) {
  max-height: 0;
  opacity: 0;
  height: v-bind(fromHeight);
}
</style>
