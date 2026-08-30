import type { BattlePlayer, BattleStatus, ChatMessage } from './battle';

interface BaseBattleEvent {
  battleId: string;
}

export interface BattleStartedEvent extends BaseBattleEvent {
  type: 'BATTLE_STARTED';
  status: BattleStatus;
}

export interface BattleTimerEvent extends BaseBattleEvent {
  type: 'BATTLE_TIMER';
  remainingSeconds: number;
}

export interface VoteUpdateEvent extends BaseBattleEvent {
  type: 'VOTE_UPDATE';
  votesA: number;
  votesB: number;
}

export interface AuraUpdateEvent extends BaseBattleEvent {
  type: 'AURA_UPDATE';
  playerA: { aura: number };
  playerB: { aura: number };
}

export interface PlayerJoinedEvent extends BaseBattleEvent {
  type: 'PLAYER_JOINED';
  player: BattlePlayer;
  slot: 'A' | 'B';
}

export interface PlayerLeftEvent extends BaseBattleEvent {
  type: 'PLAYER_LEFT';
  playerId: string;
}

export interface ViewersUpdateEvent extends BaseBattleEvent {
  type: 'VIEWERS_UPDATE';
  viewers: number;
}

export interface ChatMessageEvent extends BaseBattleEvent {
  type: 'CHAT_MESSAGE';
  message: ChatMessage;
}

export interface BattleFinishedEvent extends BaseBattleEvent {
  type: 'BATTLE_FINISHED';
  winnerId: string;
}

export type BattleEvent =
  | BattleStartedEvent
  | BattleTimerEvent
  | VoteUpdateEvent
  | AuraUpdateEvent
  | PlayerJoinedEvent
  | PlayerLeftEvent
  | ViewersUpdateEvent
  | ChatMessageEvent
  | BattleFinishedEvent;

export type SocketStatus = 'idle' | 'connecting' | 'connected' | 'disconnected' | 'error';
export type BattleEventHandler = (event: BattleEvent) => void;
export type ChatEventHandler = (message: ChatMessage) => void;
