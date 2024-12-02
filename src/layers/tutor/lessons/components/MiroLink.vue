<template>
  <Button
    as="a"
    label="Ссылка"
    :href="valid ? link : undefined"
    target="_blank"
    rel="noopener"
    :class="$style.btn"
    :style="!valid && { color: 'var(--ui-surface-400)', pointerEvents: 'none' }"
  />
</template>

<script setup lang="ts">
import { Button } from 'primevue';
import { computed } from 'vue';

// Define props
const { link } = defineProps<{ link: string }>()

// Validation logic for the link
const valid = computed(() => {
  const pattern = /^https:\/\/miro\..+/; // Matches links starting with 'https://miro.'
  try {
    return pattern.test(link) && new URL(link);
  } catch {
    return false;
  }
});
</script>

<style module>
.btn {
  background-color: transparent;
  color: var(--ui-primary-400);
  border: none;
  width: fit-content;

  &:hover {
    color: var(--ui-primary-600);
  }

}
</style>
