import { create } from 'zustand';
import type { SocketStatus } from '../types/websocket';
import type { LiveKitStatus } from '../types/livekit';

interface UiState {
  error: string | null;
  socketStatus: SocketStatus;
  liveKitStatus: LiveKitStatus;
  setError: (error: string | null) => void;
  setSocketStatus: (status: SocketStatus) => void;
  setLiveKitStatus: (status: LiveKitStatus) => void;
}

export const useUiStore = create<UiState>((set) => ({
  error: null,
  socketStatus: 'idle',
  liveKitStatus: 'idle',
  setError: (error) => set({ error }),
  setSocketStatus: (socketStatus) => set({ socketStatus }),
  setLiveKitStatus: (liveKitStatus) => set({ liveKitStatus }),
}));
