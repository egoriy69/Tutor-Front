

import router from "@/router"
import { RolesEnum } from "../enums/Roles"
import { useUserStore } from "../stores/userStore"


export const redirectRole = () => {
  const userStore = useUserStore()
  if (userStore.userRole === RolesEnum.NONE) {
    router.push({ name: 'login' })
  }
  if (userStore.userRole === RolesEnum.TUTOR) {
    router.push({ name: 'tutor' })
  }
  if (userStore.userRole === RolesEnum.STUDENT) {
    router.push({ name: 'student' })
  }
}
