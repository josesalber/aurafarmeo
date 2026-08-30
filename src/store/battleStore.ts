import { create } from 'zustand';
import { MAX_CHAT_MESSAGES } from '../lib/constants';
import type { Battle, BattlePlayer, BattleStatus, ChatMessage } from '../types/battle';
import type { BattleEvent } from '../types/websocket';

interface BattleState {
  battle: Battle | null;
  status: BattleStatus;
  playerA: BattlePlayer | null;
  playerB: BattlePlayer | null;
  votesA: number;
  votesB: number;
  auraA: number;
  auraB: number;
  viewers: number;
  remainingSeconds: number;
  winnerId: string | null;
  chatMessages: ChatMessage[];
  votedFor: string | null;
  setBattle: (battle: Battle) => void;
  applyEvent: (event: BattleEvent) => void;
  addChatMessage: (message: ChatMessage) => void;
  markVoteSent: (fighterId: string) => void;
  resetBattle: () => void;
}

const initialState = {
  battle: null,
  status: 'WAITING' as BattleStatus,
  playerA: null,
  playerB: null,
  votesA: 0,
  votesB: 0,
  auraA: 0,
  auraB: 0,
  viewers: 0,
  remainingSeconds: 300,
  winnerId: null,
  chatMessages: [],
  votedFor: null,
};

export const useBattleStore = create<BattleState>((set) => ({
  ...initialState,
  setBattle: (battle) =>
    set({
      battle,
      status: battle.status,
      playerA: battle.playerA,
      playerB: battle.playerB,
      votesA: battle.votesA,
      votesB: battle.votesB,
      auraA: battle.auraA,
      auraB: battle.auraB,
      viewers: battle.viewers,
      remainingSeconds: battle.remainingSeconds,
      winnerId: battle.winnerId,
      votedFor: null,
      chatMessages: [],
    }),
  applyEvent: (event) =>
    set((state) => {
      switch (event.type) {
        case 'BATTLE_STARTED':
          return { status: event.status };
        case 'BATTLE_TIMER':
          return { remainingSeconds: event.remainingSeconds };
        case 'VOTE_UPDATE':
          return { votesA: event.votesA, votesB: event.votesB };
        case 'AURA_UPDATE':
          return { auraA: event.playerA.aura, auraB: event.playerB.aura };
        case 'PLAYER_JOINED':
          return event.slot === 'A' ? { playerA: event.player } : { playerB: event.player };
        case 'PLAYER_LEFT':
          return {
            playerA: state.playerA?.id === event.playerId ? null : state.playerA,
            playerB: state.playerB?.id === event.playerId ? null : state.playerB,
          };
        case 'VIEWERS_UPDATE':
          return { viewers: event.viewers };
        case 'CHAT_MESSAGE':
          return {
            chatMessages: [...state.chatMessages, event.message].slice(-MAX_CHAT_MESSAGES),
          };
        case 'BATTLE_FINISHED':
          return { status: 'FINISHED', winnerId: event.winnerId, remainingSeconds: 0 };
        default:
          return state;
      }
    }),
  addChatMessage: (message) =>
    set((state) => ({ chatMessages: [...state.chatMessages, message].slice(-MAX_CHAT_MESSAGES) })),
  markVoteSent: (fighterId) => set({ votedFor: fighterId }),
  resetBattle: () => set(initialState),
}));
