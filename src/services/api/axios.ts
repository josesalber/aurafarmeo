import axios, { AxiosError } from 'axios';
import { API_URL } from '../../lib/constants';
import { getFriendlyError } from '../../lib/utils';
import { useAuthStore } from '../../store/authStore';
import { useUiStore } from '../../store/uiStore';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status;
    useUiStore.getState().setError(getFriendlyError(status));
    if (status === 401) {
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  },
);
