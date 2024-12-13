<template>
  <div :class='$style.wrapper'>
    {{ data }}
    <div v-if="newLesson">New Lesson</div>
  </div>
</template>

<script setup lang='ts'>
import { useQuery } from '@tanstack/vue-query';
import { calendarService } from '../calendarService';
import { CalendarEventType } from '@/app/enums/CalendarEnums';
import { computed,  } from 'vue';


const { id } = defineProps<{ id: number }>()
const newLesson = computed<boolean>(() => !!!id)

const { data } = useQuery({ queryKey: ['eventInfo', id], queryFn: () => calendarService.getEventInfo(CalendarEventType.LESSON, id), enabled: !newLesson.value })
</script>

<style module>
.wrapper {
  background-color: transparent;
}
</style>
