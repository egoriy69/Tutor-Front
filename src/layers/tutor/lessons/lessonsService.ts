
import type { FormSubmitEvent } from "@primevue/forms";
import { apiClient } from "@/app/api";
import type { QueryClient } from "@tanstack/vue-query";
import type { Router } from "vue-router";
import { dateToJSONNoLocale, ISOToDateNoLocale } from "@/app/utils/date";




export const lessonsService = {
  getLessons: async ({ page, size, studentId, sortOrder }: { page: number, size: number, studentId: number | null, sortOrder: number }) => {
    const response = await apiClient.get(`/lesson/get?page=${page}&size=${size}&studentId=${studentId ?? ''}&paid=${sortOrder}`)
    return { lessonsList: response.data._embedded.showListLessonsDTOList, totalElements: response.data.page.totalElements }
  },
  getLessonInfo: async (id: number) => {
    const response = await apiClient.get(`/lesson/oneLesson/${id}`)
    response.data.date = ISOToDateNoLocale(response.data.date)
    return response.data
  },
  getListOfStudents: async () => {
    const response = await apiClient.get(`/lesson/FIOStudents`)
    return response.data
  },
  createLesson: async ({ e, queryClient, router }: { e: FormSubmitEvent, queryClient: QueryClient, router: Router }) => {
    e.values.date = dateToJSONNoLocale(e.values.date)
    apiClient.post('/lesson/create', e.values).then(() => {
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


