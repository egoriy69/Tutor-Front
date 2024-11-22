<template>
   <div class='wrapper'>
      <div v-if="isPending">Loading...</div>
      <div v-if="isError">Error</div>
      <slot v-else />
   </div>
</template>

<script setup lang='ts'>

const { isPending, isError } = defineProps<{ isPending: boolean, isError: boolean }>()

</script>

<style scoped ></style>
