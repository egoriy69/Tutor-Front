import '@tanstack/vue-query';
import axios, { AxiosError } from 'axios';
import { useUserStore } from './stores/userStore';

export const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// Расширяем интерфейс для обработки ошибок в Vue Query
declare module '@tanstack/vue-query' {
  interface Register {
    defaultError: AxiosError<{ error: string; status: string }>;
  }
}

// Добавляем токен в заголовок запросов
apiClient.interceptors.request.use(
  (config) => {
    const userStore = useUserStore();
    const token = userStore.userAccessToken;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Функция для обновления токена
async function refreshToken() {
  const userStore = useUserStore();
  try {
    const response = await axios.post('http://localhost:8080/api/v1/auth/refreshToken', {
      refreshToken: localStorage.getItem('refreshToken'),
    });
    userStore.setAccessToken(response.data.accessToken); // Сохраняем новый accessToken
    return response.data.accessToken;
  } catch (error) {
    userStore.clearUser(); // Выход из аккаунта, если обновление токена не удалось
    throw error;
  }
}

// Обработка ответа и автоматическое обновление токена
apiClient.interceptors.response.use(
  (response) =>
    new Promise((resolve) => {
      setTimeout(() => resolve(response), 1000); // Задержка для симуляции
    }),
  async (error) => {
    const originalRequest = error.config;

    // Проверяем, что ошибка связана с истечением токена
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Предотвращаем повторную попытку обновления токена
      try {
        const newToken = await refreshToken();
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return apiClient(originalRequest); // Повторяем запрос с новым токеном
      } catch (err) {
        return Promise.reject(err); // Если обновление не удалось, пробрасываем ошибку
      }
    }
    // Любые другие ошибки
    return new Promise((_, reject) => {
      setTimeout(() => reject(error), 1000); // Задержка
    });
  }
);
