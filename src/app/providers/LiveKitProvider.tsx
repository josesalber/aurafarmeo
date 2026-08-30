import { createContext, useContext } from 'react';
import type { LiveKitStatus } from '../../types/livekit';
import { useUiStore } from '../../store/uiStore';

interface LiveKitContextValue {
  status: LiveKitStatus;
}

const LiveKitContext = createContext<LiveKitContextValue | null>(null);

export function LiveKitProvider({ children }: { children: React.ReactNode }) {
  const status = useUiStore((state) => state.liveKitStatus);
  return <LiveKitContext.Provider value={{ status }}>{children}</LiveKitContext.Provider>;
}

export function useLiveKitContext() {
  const context = useContext(LiveKitContext);
  if (!context) throw new Error('useLiveKitContext must be used inside LiveKitProvider');
  return context;
}
