import { useState } from 'react';
import { vote } from '../services/api/battleApi';
import { useBattleStore } from '../store/battleStore';
import { useToast } from '../components/ui/toast';

export function useVoting(battleId: string) {
  const votedFor = useBattleStore((state) => state.votedFor);
  const markVoteSent = useBattleStore((state) => state.markVoteSent);
  const { toast } = useToast();
  const [isVoting, setIsVoting] = useState(false);

  const sendVote = async (fighterId: string) => {
    setIsVoting(true);
    try {
      await vote(battleId, fighterId);
      markVoteSent(fighterId);
      toast({ title: 'Voto enviado' });
    } catch {
      toast({ title: 'No pudimos enviar tu voto', variant: 'destructive' });
    } finally {
      setIsVoting(false);
    }
  };

  return { votedFor, isVoting, sendVote };
}
