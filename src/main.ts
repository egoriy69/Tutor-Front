import '@/app/assets/css/global.css'
import '@/app/assets/css/style.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import {  VueQueryPlugin } from '@tanstack/vue-query'

import { MyPreset } from './app/assets/theme'
import PrimeVue from 'primevue/config';
import setupRouterGuards from './app/navigationGuards'
import KeyFilter from 'primevue/keyfilter';
import ru from '@/app/assets/locale/ru.json'
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';

const app = createApp(App)
app.use(ConfirmationService);
app.use(ToastService);
const pinia = createPinia();
app.use(pinia)
app.use(VueQueryPlugin,
  {
    enableDevtoolsV6Plugin: true
  }
)
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: MyPreset,
    options: {
      prefix: 'ui',
      darkModeSelector: '.dark',
      cssLayer: true

    }
  },
  locale: ru
});
setupRouterGuards(router);
app.directive('keyfilter', KeyFilter);
app.mount('#app')
