
import type { FormSubmitEvent } from "@primevue/forms";
import { apiClient } from "@/app/api";
import type { QueryClient } from "@tanstack/vue-query";
import { emailError } from "@/layers/auth/authService";
import type { Router } from "vue-router";


export const studentsPageService = {
  // register: async ({ body, route }: { body: RegData, route: RouteLocationNormalizedLoaded }): Promise<AuthenticationResponse> => {
  //   delete body.confirmPassword
  //   const response = await apiClient.post(`/auth/registration/${route.params.regToken}`, body)
  //   return response.data
  // },
  getStudents: async ({ page, size, activeStatus }: { page: number, size: number, activeStatus: string }) => {
    const response = await apiClient.get(`/student/get/${activeStatus}?page=${page}&size=${size}`)
    return { studentsList: response.data._embedded.getUserDTOList.reverse(), totalElements: response.data.page.totalElements }
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
    console.log(id)
    const response = await apiClient.post(`/admin/repeatRequestRegistration/${id}`)
    console.log(response.data)
    return response.data
  }

}



