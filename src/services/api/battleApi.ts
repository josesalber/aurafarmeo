import type { Battle, BattleSummary } from '../../types/battle';
import type { LiveKitTokenResponse } from '../../types/livekit';
import { apiClient } from './axios';

export async function getBattles(): Promise<BattleSummary[]> {
  const { data } = await apiClient.get<BattleSummary[]>('/api/battles');
  return data;
}

export async function getBattle(id: string): Promise<Battle> {
  const { data } = await apiClient.get<Battle>(`/api/battles/${id}`);
  return data;
}

export async function joinBattle(id: string): Promise<Battle> {
  const { data } = await apiClient.post<Battle>(`/api/battles/${id}/join`);
  return data;
}

export async function leaveBattle(id: string): Promise<void> {
  await apiClient.post(`/api/battles/${id}/leave`);
}

export async function vote(id: string, fighterId: string): Promise<void> {
  await apiClient.post(`/api/battles/${id}/vote`, { fighterId });
}

export async function getLiveKitToken(id: string): Promise<LiveKitTokenResponse> {
  const { data } = await apiClient.get<LiveKitTokenResponse>(`/api/battles/${id}/livekit-token`);
  return data;
}
