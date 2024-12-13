import { apiClient } from "@/app/api"
import type { Event } from "./CalendarTypes"
import { formatCalendarStringToISO, formatISOToCalendarString } from "./utlis"





export const calendarService = {
  getAllEvents: async (start: string, end: string) => {
    const startDate = formatCalendarStringToISO(start)
    const endDate = formatCalendarStringToISO(end)
    const response = await apiClient.get(`/calendar?startDate=${startDate}&endDate=${endDate}`)
    response.data = response.data.map((el:Event) => ({ ...el, start: formatISOToCalendarString(el.startDate), end:  formatISOToCalendarString(el.endDate)}))
    // console.log(response.data, 'data')
    return response.data
  },
  getEventInfo: async(eventType:string,id:number)=>{
    const response = await apiClient.get(`/calendar/${eventType}/${id}`)
    console.log(response.data, 'data')
    return response.data
  }
  // getLessons: async ({ page, size, studentId, sortOrder }: { page: number, size: number, studentId: number | null, sortOrder: number | null }) => {
  //   const response = await apiClient.get(`/lesson/get?page=${page}&size=${size}&paid=${sortOrder||''}&studentId=${studentId || ''}`)
  //   return { lessonsList: response.data._embedded.showListLessonsDTOList, totalElements: response.data.page.totalElements }
  // },
  // getLessonInfo: async (id: number) => {
  //   const response = await apiClient.get(`/lesson/oneLesson/${id}`)
  //   response.data.date = ISOToDateNoLocale(response.data.date)
  //   return response.data
  // },
  // getListOfStudents: async () => {
  //   const response = await apiClient.get(`/lesson/FIOStudents`)
  //   return response.data
  // },
  // createLesson: async ({ e, queryClient, router }: { e: FormSubmitEvent, queryClient: QueryClient, router: Router }) => {
  //   e.values.date = dateToJSONNoLocale(e.values.date)
  //   apiClient.post('/lesson/create', e.values).then(() => {
  //     queryClient.invalidateQueries({ queryKey: ['lessons'] })
  //     router.go(-1)
  //   }).catch(error => {
  //     console.log(error)
  //   })
  // },
  // updateLesson: async ({ e, queryClient, router }: { e: FormSubmitEvent, queryClient: QueryClient, router: Router }) => {
  //   const id = e.values.id
  //   delete e.values.id
  //   e.values.date = dateToJSONNoLocale(e.values.date)
  //   console.log(e.values)
  //   apiClient.patch(`/lesson/${id}`, e.values).then(() => {
  //     queryClient.invalidateQueries({ queryKey: ['lessons'] })
  //     router.go(-1)
  //   }).catch(error => {
  //     console.log(error)
  //   })
  // },
  // deleteLesson: async ({ id, queryClient, router }: { id: number, queryClient: QueryClient, router: Router }) => {
  //   apiClient.delete(`/lesson/delete/${id}`).then(() => {
  //     queryClient.invalidateQueries({ queryKey: ['lessons'] })
  //     router.go(-1)
  //   })
  // },
}


