import { useEffect } from 'react';
import { battleSocket } from '../services/websocket/battleSocket';
import { useBattleStore } from '../store/battleStore';
import { useUiStore } from '../store/uiStore';
import { useToast } from '../components/ui/toast';

export function useBattleSocket(battleId: string | undefined) {
  const applyEvent = useBattleStore((state) => state.applyEvent);
  const addChatMessage = useBattleStore((state) => state.addChatMessage);
  const setSocketStatus = useUiStore((state) => state.setSocketStatus);
  const { toast } = useToast();

  useEffect(() => {
    if (!battleId) return undefined;

    setSocketStatus('connecting');
    battleSocket.connect((connected) => {
      setSocketStatus(connected ? 'connected' : 'disconnected');
      if (connected) {
        toast({ title: 'Conectado' });
      } else {
        toast({ title: 'Desconectado', description: 'Reconectando...' });
      }
    });

    const unsubscribeBattle = battleSocket.subscribeToBattle(battleId, (event) => {
      applyEvent(event);
      if (event.type === 'BATTLE_FINISHED') toast({ title: 'Batalla terminada' });
    });
    const unsubscribeChat = battleSocket.subscribeToChat(battleId, addChatMessage);

    return () => {
      unsubscribeBattle();
      unsubscribeChat();
      battleSocket.disconnect();
      setSocketStatus('idle');
    };
  }, [addChatMessage, applyEvent, battleId, setSocketStatus, toast]);
}
