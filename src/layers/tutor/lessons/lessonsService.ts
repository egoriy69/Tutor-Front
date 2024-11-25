
import type { FormSubmitEvent } from "@primevue/forms";
import { apiClient } from "@/app/api";
import type { QueryClient } from "@tanstack/vue-query";
import type { Router } from "vue-router";




export const lessonsService = {
  getLessons: async ({ page, size }: { page: number, size: number }) => {
    const response = await apiClient.get(`/lesson/get?page=${page}&size=${size}`)
    return { lessonsList: response.data._embedded.showListLessonsDTOList, totalElements: response.data.page.totalElements }
  },
  getLessonInfo: async (id: number) => {
    const response = await apiClient.get(`/lesson/oneLesson/${id}`)
    response.data.date = response.data.date ? new Date(response.data.date) : null
    return response.data
  },
  getListOfStudents: async () => {
    const response = await apiClient.get(`/lesson/FIOStudents`)
    return response.data
  },
  createLesson: async ({ e, queryClient, router }: { e: FormSubmitEvent, queryClient: QueryClient, router: Router }) => {
    e.values.date = e.values.date ? e.values.date.toISOString() : null
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
    e.values.date = e.values.date ? e.values.date.toISOString() : null
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


