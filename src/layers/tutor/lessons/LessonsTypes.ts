import type { LessonStatus } from "@/app/enums/LessonStatus"



export type Lesson = {
  id?: number,
  miroLink: string
  cost: number | null
  duration: number | null
  shortDescription: string
  categoryId: number | null
  studentId: number | null
  homeWork: LessonStatus
  paid: boolean
  date: Date | null

}
export type receivedStudent = {
  id: number,
  fullName: string
  grade: number
  email: string
}


