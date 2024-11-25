import type { RolesEnum } from "@/app/enums/Roles"


export type LoginData = {
  email: string| undefined
  password: string| undefined
}
export type RegData = {
  lastName: string
  firstName: string
  email: string
  password: string
  confirmPassword?: string
}
export type AuthenticationResponse = {
  role: RolesEnum
  lastName: string
  firstName: string
  accessToken: string
  refreshToken?: string
}
