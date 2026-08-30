import type { User } from '../../types/user';
import { apiClient } from './axios';

export async function getProfile(): Promise<User> {
  const { data } = await apiClient.get<User>('/api/users/me');
  return data;
}
