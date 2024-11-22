
import type { FormSubmitEvent } from "@primevue/forms";
import { apiClient } from "@/app/api";
import type { QueryClient } from "@tanstack/vue-query";
import type { Router } from "vue-router";




export const lessonsService = {
  getLessons: async ({ page, size }: { page: number, size: number }) => {
    const response = await apiClient.get(`/lesson/get?page=${page}&size=${size}`)
    return { lessonsList: response.data._embedded.showListLessonsDTOList.reverse(), totalElements: response.data.page.totalElements }
  },
  getStudentInfo: async (id: number) => {
    const response = await apiClient.get(`/student/getInfoStudent/${id}`)
    return response.data
  },
  getListOfStudents: async () => {
    const response = await apiClient.get(`/lesson/FIOStudents`)
    console.log(response.data)
    return response.data
  },
  createLesson: async ({ e, queryClient, router }: { e: FormSubmitEvent, queryClient: QueryClient, router: Router }) => {
    e.values.date = e.values.date.toISOString()
    apiClient.post('/lesson/create', e.values).then(() => {
      queryClient.invalidateQueries({ queryKey: ['lessons'] })
      router.go(-1)
    }).catch(error => {
      console.log(error)
    })
  },
  updateStudent: async ({ e, queryClient, router }: { e: FormSubmitEvent, queryClient: QueryClient, router: Router }) => {
    e.values.sendEmail = Boolean(e.values.sendEmail)
    const id = e.values.id
    delete e.values.id
    apiClient.patch(`/student/update/${id}`, e.values).then(() => {
      queryClient.invalidateQueries({ queryKey: ['students'] })
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
  repeatRequestRegistration: async (id: number) => {
    console.log(id)
    const response = await apiClient.post(`/admin/repeatRequestRegistration/${id}`)
    console.log(response.data)
    return response.data
  }
}


