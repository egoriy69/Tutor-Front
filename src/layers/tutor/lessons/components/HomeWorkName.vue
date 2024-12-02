<template>
  <div :class='$style.wrapper' :style="{ 'background-color': homeWorkColors[name] }">
    {{ homeWork[name] }}
  </div>
</template>

<script setup lang='ts'>
import { homeWork, homeWorkColors } from '@/app/enums/LessonStatus';


type Props = {
  name: keyof typeof homeWork; // Ограничиваем значения name ключами из homeWork
};

const { name } = defineProps<Props>()
</script>

<style module>
.wrapper {
  padding: 5px;
  border-radius: 10px;
}
</style>
