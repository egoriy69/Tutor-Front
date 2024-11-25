

import { apiClient } from "@/app/api";





export const financeService = {
  getGraph: async () => {
    const response = await apiClient.get(`/transaction/graph/date?startDate=&endDate=`,)
    return response.data
  },

}


