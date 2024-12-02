<template>
  <i v-if="status" class="pi pi-arrow-up" style="color:var(--ui-green-400)" v-bind="$attrs"/>
  <i v-else class="pi pi-arrow-down" style="color:var(--ui-red-400)" v-bind="$attrs"/>
</template>

<script setup lang='ts'>

const { status = false } = defineProps<{ status: boolean }>()

</script>

<style module>
.wrapper {
  background-color: transparent;
}
</style>
