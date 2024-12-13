
import type { FormSubmitEvent } from "@primevue/forms";
import { apiClient } from "@/app/api";
import type { QueryClient } from "@tanstack/vue-query";
import type { Router } from "vue-router";
import { dateToJSONNoLocale, ISOToDateNoLocale } from "@/app/utils/date";
import dayjs from "dayjs";
import { CalendarEventType } from "@/app/enums/CalendarEnums";




export const lessonsService = {
  getLessons: async ({ page, size, studentId, sortOrder }: { page: number, size: number, studentId: number | null, sortOrder: number | null }) => {
    const response = await apiClient.get(`/lesson/get?page=${page}&size=${size}&paid=${sortOrder||''}&studentId=${studentId || ''}`)
    return { lessonsList: response.data._embedded.showListLessonsDTOList, totalElements: response.data.page.totalElements }
  },
  getLessonInfo: async (id: number) => {
    const response = await apiClient.get(`/calendar/LESSON/${id}`)
    response.data.date = new Date(response.data.date)
    response.data.startTime = response.data.startTime.slice(0,-3)
    response.data.endTime = response.data.endTime.slice(0,-3)
    return response.data
  },
  getListOfStudents: async () => {
    const response = await apiClient.get(`/lesson/FIOStudents`)
    return response.data
  },
  createLesson: async ({ e, queryClient, router }: { e: FormSubmitEvent, queryClient: QueryClient, router: Router }) => {
    e.values.date = dayjs(e.values.date).format('YYYY-MM-DD')
    console.log(e.values)
    e.values.color = 'blue'
    e.values.eventType = CalendarEventType.LESSON
    apiClient.post('/calendar/event', e.values).then(() => {
      queryClient.invalidateQueries({ queryKey: ['lessons'] })
      router.go(-1)
    }).catch(error => {
      console.log(error)
    })
  },
  updateLesson: async ({ e, queryClient, router }: { e: FormSubmitEvent, queryClient: QueryClient, router: Router }) => {
    const id = e.values.id
    delete e.values.id
    e.values.date = dateToJSONNoLocale(e.values.date)
    console.log(e.values)
    apiClient.patch(`/lesson/${id}`, e.values).then(() => {
      queryClient.invalidateQueries({ queryKey: ['lessons'] })
      router.go(-1)
    }).catch(error => {
      console.log(error)
    })
  },
  deleteLesson: async ({ id, queryClient, router }: { id: number, queryClient: QueryClient, router: Router }) => {
    apiClient.delete(`/lesson/delete/${id}`).then(() => {
      queryClient.invalidateQueries({ queryKey: ['lessons'] })
      router.go(-1)
    })
  },
}


