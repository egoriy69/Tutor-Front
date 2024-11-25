

import { createRouter, createWebHistory } from 'vue-router'
import AuthLayout from './layers/auth/layouts/AuthLayout.vue'
import LoginPage from './layers/auth/pages/LoginPage.vue'
import RegPage from './layers/auth/pages/RegPage.vue'
import { RolesEnum } from './app/enums/Roles'


import 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    transition?: string; // Или другой ожидаемый тип
  }
}




const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/auth',
      name: 'auth',
      component: AuthLayout,
      meta: {
        allowedRoles: [RolesEnum.NONE]
      },
      redirect: { name: 'login' },
      children: [
        {
          path: 'login',
          name: 'login',
          component: LoginPage,
          // meta: { transition: 'login' },
        },
        {
          path: 'registration/:regToken?',
          name: 'reg',
          component: RegPage,
          // meta: { transition: 'reg' },
        },
        {
          path: 'reset',
          name: 'reset',
          // meta: { transition: 'reset' },
          component: () => import('./layers/auth/pages/ResetPage.vue')
        }
      ]
    },
    {
      path: '/tutor',
      name: 'tutor',
      component: () => import('./layers/tutor/TutorLayout.vue'),
      redirect: { name: 'lessons' },
      meta: {
        allowedRoles: [RolesEnum.TUTOR]
      },
      children: [
        {
          path: 'lessons',
          name: 'lessons',
          component: () => import('./layers/tutor/lessons/pages/LessonsPage.vue'),
          children: [
            {
              path: 'form/:id?',
              name: 'lessonsForm',
              component: () => import('./layers/tutor/lessons/pages/LessonsForm.vue'),
            }
          ]
        },
        {
          path: 'students',
          name: 'students',
          component: () => import('./layers/tutor/students/pages/StudentsPage.vue'),
          // beforeEnter: (to) => {
          //   if (!to.query.status) to.query.status = ActiveStatus.ACTIVE
          // },
          children: [
            {
              path: 'form/:id?',
              name: 'studentForm',
              component: () => import('./layers/tutor/students/pages/StudentsForm.vue'),
            }
          ]
        },

      ]
    },
    {
      path: '/:pathMatch(.*)',
      name: 'not-found',
      redirect: { name: 'login', params: {} }
    }
  ]
})


export default router
