import type { LessonStatus } from "@/app/enums/LessonStatus"



export type Lesson = {
  id?: number,
  miroLink: string
  cost: number | null
  // duration: number | null
  shortDescription: string
  categoryId: number | null
  studentId: Array<string> | null
  homeWork: LessonStatus
  paid: boolean
  startTime:string
  endTime:string
  date: Date | null

}
export type receivedStudent = {
  id: number,
  fullName: string
  grade: number
  email: string
}


