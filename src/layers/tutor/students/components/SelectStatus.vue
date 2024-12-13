<template>
  <ButtonGroup>
    <Button :label="ActiveStatusName.ACTIVE" as="router-link" :to="{ query: { status: ActiveStatus.ACTIVE } }"
      :class="{ 'active-link': isActive('ACTIVE') }" severity="secondary" />
    <Button :label="ActiveStatusName.REQUEST" as="router-link" :to="{ query: { status: ActiveStatus.REQUEST } }"
      :class="{ 'active-link': isActive('REQUEST') }" severity="secondary" />
    <Button :label="ActiveStatusName.NONACTIVE" as="router-link" :to="{ query: { status: ActiveStatus.NONACTIVE } }"
      :class="{ 'active-link': isActive('NONACTIVE') }" severity="secondary" />
  </ButtonGroup>
</template>

<script setup lang="ts">
import { ActiveStatus, ActiveStatusName } from '@/app/enums/ActiveStatus';
import { Button, ButtonGroup } from 'primevue';
import { useRoute } from 'vue-router';

const route = useRoute();

// Функция проверки активности ссылки с учетом query
const isActive = (status: keyof typeof ActiveStatus) => {
  return route.query.status === ActiveStatus[status];
};
</script>

<style scoped>
.active-link {
  background: var(--ui-button-secondary-active-background);
  color: var(--ui-button-secondary-active-color);
}
</style>
