import type { AuthenticationResponse } from '@/layers/auth/AuthTypes';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { RolesEnum } from '../enums/Roles';

export const useUserStore = defineStore('userStore', () => {
  const user = ref({
    lastName: localStorage.getItem('lastName') || '',
    firstName: localStorage.getItem('firstName') || '',
    role: (localStorage.getItem('role') as RolesEnum) || RolesEnum.NONE,
    accessToken: localStorage.getItem('accessToken')|| '',
  })
  const setUser = (data: AuthenticationResponse) => {
    user.value.lastName = data.lastName;
    user.value.firstName = data.firstName;
    user.value.role = data.role as RolesEnum;
    user.value.accessToken = data.accessToken
    // Сохранение в localStorage
    localStorage.setItem('lastName', data.lastName);
    localStorage.setItem('firstName', data.firstName);
    localStorage.setItem('role', data.role);
    localStorage.setItem('accessToken', data.accessToken || '');
    localStorage.setItem('refreshToken', data.refreshToken || '');
  }
  const clearUser = () => {
    user.value.lastName = '';
    user.value.firstName = '';
    user.value.role = RolesEnum.NONE;
    user.value.accessToken = ''
    // Очистка localStorage
    localStorage.removeItem('lastName');
    localStorage.removeItem('firstName');
    localStorage.removeItem('role');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
  const userRole = computed(() => (user.value.role))
  const isLoggedIn = computed(() => user.value.role !== RolesEnum.NONE)
  const userAccessToken = computed(() => user.value.accessToken)


  return { user, setUser, clearUser, userRole, isLoggedIn, userAccessToken }
})

