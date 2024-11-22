import axios, { AxiosError } from "axios";
import '@tanstack/vue-query'

declare module '@tanstack/vue-query' {
  interface Register {
    defaultError: AxiosError<{ error: string, status: string }>
  }
}
export const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
  },
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
