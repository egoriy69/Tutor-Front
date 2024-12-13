

import { createRouter, createWebHistory } from 'vue-router'
import AuthLayout from './layers/auth/layouts/AuthLayout.vue'
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
          component: () => import('./layers/auth/pages/LoginPage.vue')
          // meta: { transition: 'login' },
        },
        {
          path: 'registration/:regToken?',
          name: 'reg',
          component: () => import('./layers/auth/pages/RegPage.vue'),
          // meta: { transition: 'reg' },
        },
        {
          path: 'requestReset',
          name: 'requestReset',
          // meta: { transition: 'reset' },
          component: () => import('./layers/auth/pages/RequestResetPage.vue')
        },
        {
          path: 'reset/:resetToken',
          name: 'reset',
          // meta: { transition: 'reset' },
          component: () => import('./layers/auth/pages/ResetPage.vue')
        }
      ]
    },
    {
      path: '/tutor',
      name: 'tutor',
      component: () => import('./layers/tutor/layouts/TutorLayout.vue'),
      redirect: { name: 'lessons' },
      meta: {
        allowedRoles: [RolesEnum.TUTOR]
      },
      children: [
        {
          path: 'lessons',
          name: 'lessons',
          component: () =>
            Promise.all([
              import('./layers/tutor/lessons/pages/LessonsPage.vue'),
              import('./layers/tutor/lessons/pages/LessonsForm.vue'),
            ]).then(([LessonsPage]) => LessonsPage.default),
          // component: () => import('./layers/tutor/lessons/pages/LessonsPage.vue'),
          children: [
            {
              path: 'form/:id?',
              name: 'lessonsForm',
              component: () => import('./layers/tutor/lessons/pages/LessonsForm.vue'),
            },
          ]
        },
        {
          path: 'students',
          name: 'students',
          component: () =>
            Promise.all([
              import('./layers/tutor/students/pages/StudentsPage.vue'),
              import('./layers/tutor/students/pages/StudentsForm.vue'),
            ]).then(([LessonsPage]) => LessonsPage.default),
          // component: () => import('./layers/tutor/students/pages/StudentsPage.vue'),
          children: [
            {
              path: 'form/:id?',
              name: 'studentForm',
              component: () => import('./layers/tutor/students/pages/StudentsForm.vue'),
            }
          ]
        },
        {
          path: 'finance',
          name: 'finance',
          component: () => import('./layers/tutor/finance/pages/FinancePage.vue'),
          children: [
            {
              path: 'category/form/:id?',
              name: 'categoryForm',
              component: () => import('./layers/tutor/finance/components/CategoryTable/CategoryForm.vue')
            },
            {
              path: 'transaction/form/:id?',
              name: 'transactionForm',
              component: () => import('./layers/tutor/finance/components/Transactions/TransactionForm.vue')
            }
          ]
        },
        {
          path: 'calendar',
          name: 'calendar',
          component: () => import('./layers/tutor/calendar/pages/CalendarPage.vue'),
          children: [
            {
              path: 'form/:id?',
              name: 'categoryForm',
              component: () => import('./layers/tutor/finance/components/CategoryTable/CategoryForm.vue')
            },
          ]
        },

      ]
    },
    {
      path: '/student',
      name: 'student',
      component: () => import('./layers/student/layouts/StudentLayout.vue'),
      redirect: { name: 'studentLessons' },
      meta: {
        allowedRoles: [RolesEnum.STUDENT]
      },
      children: [
        {
          path: 'lessons',
          name: 'studentLessons',
          component: () => import('./layers/tutor/lessons/pages/LessonsPage.vue'),
        }
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
