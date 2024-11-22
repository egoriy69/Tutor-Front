
import type { Router } from "vue-router"
import { useUserStore } from "./stores/userStore"
import { redirectRole } from "./utils/redirectRole"




export default function setupRouterGuards(router: Router) {
  const userStore = useUserStore()
  router.beforeEach((to, from) => {
    const isAllowed = (to.meta.allowedRoles as Array<string>).includes(userStore.userRole)
    if (!isAllowed) {
      if (from.name) {
        return false
      } else {
        redirectRole()
      }
    }
  })
}

