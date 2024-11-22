<template>
  <div :class='$style.wrapper'>
    <img src="@/app/assets/images/logo-cutted.png" />
    <RouterView />
  </div>
</template>

<script setup lang='ts'>
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

  &>img {
    margin: auto;
    max-width: 300px;
    font-size: 2rem;
    margin-bottom: 20px;
  }
}

</style>
