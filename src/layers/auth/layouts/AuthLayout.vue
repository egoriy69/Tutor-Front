<template>
  <div :class='$style.wrapper'>
    <img src="@/app/assets/images/logo-cutted.png" />
    <RouterView v-slot="{ Component, route }">

      <Transition :name="route.meta.transition">
        <Component :is="Component" />
      </Transition>
    </RouterView>
  </div>
</template>

<script setup lang='ts'>
import { onBeforeRouteUpdate } from 'vue-router';

onBeforeRouteUpdate(async (to, from) => {
  if (to.name === 'reg') {
    to.meta.transition = 'reg'
  }
  if (to.name === 'reset') {
    to.meta.transition = 'reset'
  }
  if (to.name === 'login' && from.name === 'reg') {
    to.meta.transition = 'login'
  }
  if (to.name === 'login' && from.name === 'reset') {
    to.meta.transition = 'loginFromReset'
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
  --reset-height: 290px;
}

:global(.reg-enter-active) {
  transition: max-height .5s,opacity 1s;
  opacity: 1;
  max-height: var(--reg-height);
}

:global(.reg-enter-from) {
  height: 0;
  opacity: 0;
  max-height: var(--login-height);
}

:global(.login-enter-active) {
  transition: height .5s,opacity 1s;
  opacity: 1;
  height: var(--login-height);
}

:global(.login-enter-from) {
  max-height: 0;
  opacity: 0;
  height: var(--reg-height);
}

:global(.loginFromReset-enter-active) {
  transition: max-height .5s,opacity 1s;
  opacity: 1;
  max-height: var(--login-height);
}

:global(.loginFromReset-enter-from) {
  height: 0;
  opacity: 0;
  max-height: var(--reset-height);
}

:global(.reset-enter-active) {
  transition: height .5s,opacity 1s;
  opacity: 1;
  height: var(--reset-height);
}

:global(.reset-enter-from) {
  max-height: 0;
  opacity: 0;
  height: var(--login-height);
}
</style>
