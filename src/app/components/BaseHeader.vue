<template>
  <div :class='$style.wrapper'>
    <nav>
      <slot></slot>
    </nav>
    <div>
      <RouterLink to="">
        <i class="pi pi-user"></i>
      </RouterLink>
      <UseDark v-slot="{ isDark, toggleDark }">
        <i v-show="isDark" @click="toggleDark()" class="pi pi-sun"></i>
        <i v-show="!isDark" @click="toggleDark()" class="pi pi-moon"></i>
      </UseDark>
      <i class="pi pi-sign-out" @click="logOut"></i>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useUserStore } from '@/app/stores/userStore';
import { UseDark } from '@vueuse/components';
import { useRouter } from 'vue-router';


const router = useRouter()
const userStore = useUserStore()
const logOut = () => {
  userStore.clearUser()
  router.push({ name: 'login' })
}


</script>

<style module>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 60px;
  padding: 0 20px;
  border-bottom: 1px solid var(--gray-text);

  &>nav {
    display: flex;
    gap: 20px;

    &>a {
      padding: 10px;
      /* flex: 1 1 0; */
      width: 100px;
      text-align: center;
      color: var(--main-text);
      transition: color .4s;

      &:hover {
        color: var(--main-text-hover);
      }

      &:global(.router-link-active) {
        color: var(--ui-primary-color);
      }
    }
  }

  &>div {
    position: absolute;
    display: flex;
    gap: 20px;
    transform: translateY(-50%);
    top: 50%;
    right: 20px;

    &>a {
      display: block;
    }

    & i {
      padding: 10px;
      font-size: 1.2rem;
    }
  }
}
</style>
