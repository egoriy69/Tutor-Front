
import type { FormSubmitEvent } from "@primevue/forms";
import { apiClient } from "@/app/api";
import type { QueryClient } from "@tanstack/vue-query";
import { emailError } from "@/layers/auth/authService";
import type { Router } from "vue-router";


export const studentsPageService = {
  getStudents: async ({ page, size, activeStatus = 'ACTIVE' }: { page: number, size: number, activeStatus: string|null }) => {
    const response = await apiClient.get(`/student/get/${activeStatus}?page=${page}&size=${size}`)
    const studentsList = response?.data?._embedded?.getUserDTOList || []
    return { studentsList: studentsList, totalElements: response.data.page.totalElements }
  },
  getStudentInfo: async (id: number) => {
    const response = await apiClient.get(`/student/getInfoStudent/${id}`)
    console.log(response.data)
    return response.data
  },
  createStudent: async ({ e, queryClient, router }: { e: FormSubmitEvent, queryClient: QueryClient, router: Router }) => {
    apiClient.post('/admin', e.values).then(() => {
      queryClient.invalidateQueries({ queryKey: ['students'] })
      router.go(-1)
    }).catch(error => {
      emailError(error, e)
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
      emailError(error, e)
    })
  },
  deleteStudent: async ({ id, queryClient, router }: { id: number, queryClient: QueryClient, router: Router }) => {
    apiClient.delete(`/student/delete/${id}`).then(() => {
      queryClient.invalidateQueries({ queryKey: ['students'] })
      router.go(-1)
    })
  },
  repeatRequestRegistration: async (id: number) => {
    const response = await apiClient.post(`/admin/repeatRequestRegistration/${id}`)
    return response.data
  }

}



