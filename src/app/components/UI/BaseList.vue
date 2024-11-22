<template>
  <div :class='$style.wrapper'>
    <div v-if="$slots.heading" :class="$style.heading">
      <slot name="heading" />
      <!-- expected span* -->
    </div>
    <div v-if="$slots.content" :class="$style.content">
      <slot name="content" />
      <!-- expected li*>span* -->
    </div>
    <div v-if="$slots.pagination" :class="$style.pagination">
      <slot name="pagination" />
    </div>
    <!-- <BaseList>
      <template #heading>
          <span>Имя</span>
          <span>Фамилия</span>
          <span style="max-width: 70px;text-align: center;">Класс</span>
          <span>Почта</span>
      </template>
<template #content>
          <li v-for="student in data" :key="student.id">
            <span>{{ student.firstName }}</span>
            <span>{{ student.lastName }}</span>
            <span style="max-width: 70px;text-align: center;">{{ student.grade }}</span>
            <span>{{ student.email }}</span>
          </li>
      </template>
<template #pagination>

      </template>
</BaseList> -->
  </div>
</template>

<script setup lang='ts'>

</script>

<style module>
.wrapper {
  border-radius: 10px;
  box-shadow: 0 0 5px var(--ui-surface-300);
}

.content>li {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--gray-text);

  &>span {
    padding: 10px;
    width: 100%;
  }
}

.heading {
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid var(--gray-text);

  &>span {
    padding: 10px;
    width: 100%;
  }
}

.content>li:last-child {
  border-bottom: none;
}
</style>
