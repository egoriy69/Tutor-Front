import '@tanstack/vue-query'
import axios, { AxiosError } from "axios";
import { useUserStore } from './stores/userStore';

export const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    // 'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
  },
});
declare module '@tanstack/vue-query' {
  interface Register {
    defaultError: AxiosError<{ error: string, status: string }>
  }
}

apiClient.interceptors.request.use((config) => {
  const userStore = useUserStore()
  const token = userStore.userAccessToken;
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});
apiClient.interceptors.response.use(
  response =>
    new Promise(resolve => {
      setTimeout(() => resolve(response), 1000); // Задержка
    }),
  error =>
    new Promise((_, reject) => {
      setTimeout(() => reject(error), 1000); // Задержка
    })
);
