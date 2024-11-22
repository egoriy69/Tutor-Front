<template>
  <div :class='$style.wrapper'>
    BaseModal
    <slot />
  </div>
</template>

<script setup lang='ts'>

</script>

<style module>
.wrapper {
  background-color: transparent;
}
</style>
