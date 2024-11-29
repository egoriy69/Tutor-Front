
import { apiClient } from "@/app/api";
import { dateToJSONNoLocale, formatToLocalDate, ISOToDateNoLocale } from "@/app/utils/date";
import type { FormSubmitEvent } from "@primevue/forms";
import type { QueryClient } from "@tanstack/vue-query";
import type { Router } from "vue-router";





export const transactionService = {
  getTransactions: async (page: number, size: number, startDate: Date, endDate: Date) => {
    const newStartDate = startDate ? formatToLocalDate(startDate) : ''
    const newEndDate = endDate ? formatToLocalDate(endDate) : ''
    const response = await apiClient.get(`/transaction/all?page=${page}&size=${size}&start=${newStartDate}&finish=${newEndDate}`,)
    return { transactionsList: response.data._embedded.getTransactionDTOList, totalElements: response.data.page.totalElements }
  },
  getTransactionInfo: async (id: number) => {
    const response = await apiClient.get(`/transaction/${id}`)
    response.data.createdAt = ISOToDateNoLocale(response.data.createdAt)
    return response.data
  },
  createTransaction: async (e: FormSubmitEvent, queryClient: QueryClient, router: Router) => {
    e.values.createdAt = dateToJSONNoLocale(e.values.createdAt)
    apiClient.post('/transaction', e.values).then(() => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      queryClient.invalidateQueries({ queryKey: ['graph'] })
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      router.go(-1)
    }).catch(error => {
      console.log(error)
    })
  },
  updateTransaction: async (e: FormSubmitEvent, queryClient: QueryClient, router: Router) => {
    const id = e.values.id
    delete e.values.id
    e.values.createdAt = dateToJSONNoLocale(e.values.createdAt)
    apiClient.patch(`/transaction/${id}`, e.values).then(() => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      queryClient.invalidateQueries({ queryKey: ['graph'] })
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      router.go(-1)
    }).catch(error => {
      console.log(error)
    })
  },
  deleteTransaction: async (id: number, queryClient: QueryClient, router: Router) => {
    apiClient.delete(`/transaction/${id}`).then(() => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      queryClient.invalidateQueries({ queryKey: ['graph'] })
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      router.go(-1)
    })
  },
}


