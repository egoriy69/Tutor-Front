
import { apiClient } from "@/app/api";
import { formatToLocalDate } from "@/app/utils/date";
import type { FormSubmitEvent } from "@primevue/forms";
import type { QueryClient } from "@tanstack/vue-query";
import type { Router } from "vue-router";





export const categoryService = {
  getCategories: async (startDate?: Date, endDate?: Date ) => {
    const newStartDate = startDate ? formatToLocalDate(startDate) : ''
    const newEndDate = endDate ? formatToLocalDate(endDate) : ''
    const response = await apiClient.get(`/category?order=desc&start=${newStartDate}&finish=${newEndDate}`,)
    return response.data
  },
  getCategoryInfo: async (id: number) => {
    const response = await apiClient.get(`/category/${id}`)
    return response.data
  },
  createCategory: async (e: FormSubmitEvent, queryClient: QueryClient, router: Router) => {
    apiClient.post('/category', e.values).then(() => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      router.go(-1)
    }).catch(error => {
      console.log(error)
    })
  },
  updateCategory: async (e: FormSubmitEvent, queryClient: QueryClient, router: Router) => {
    const id = e.values.id
    delete e.values.id
    apiClient.patch(`/category/${id}`, e.values).then(() => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      router.go(-1)
    }).catch(error => {
      console.log(error)
    })
  },
  deleteCategory: async (id: number, queryClient: QueryClient, router: Router) => {
    apiClient.delete(`/category/${id}`).then(() => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      router.go(-1)
    })
  },
}


