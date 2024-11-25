

import { apiClient } from "@/app/api";
import { formatToLocalDate } from "@/app/utils/utils";





export const financeService = {
  getGraph: async (type: string, startDate: Date, endDate: Date) => {
    const newStartDate = startDate ? formatToLocalDate(startDate) : ''
    const newEndDate = endDate ? formatToLocalDate(endDate) : ''
    const response = await apiClient.get(`/transaction/graph/${type}?startDate=${newStartDate}&endDate=${newEndDate}`,)
    return response.data
  },

}


