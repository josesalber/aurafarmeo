export type BattleStatus = 'WAITING' | 'STARTING' | 'ACTIVE' | 'FINISHED' | 'CANCELLED';

export interface BattlePlayer {
  id: string;
  username: string;
  avatar: string | null;
  aura: number;
  votes: number;
  isLocal?: boolean;
}

export interface BattleSummary {
  id: string;
  status: BattleStatus;
  playerA: BattlePlayer | null;
  playerB: BattlePlayer | null;
  viewers: number;
  startedAt?: string;
}

export interface Battle extends BattleSummary {
  votesA: number;
  votesB: number;
  auraA: number;
  auraB: number;
  remainingSeconds: number;
  winnerId: string | null;
}

export interface VotePayload {
  fighterId: string;
}

export interface ChatMessage {
  id: string;
  battleId: string;
  userId: string;
  username: string;
  message: string;
  createdAt: string;
}
