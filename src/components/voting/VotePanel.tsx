import { useVoting } from '../../hooks/useVoting';
import type { BattlePlayer } from '../../types/battle';
import { Card } from '../ui/card';
import { VoteButton } from './VoteButton';
import { VoteCounter } from './VoteCounter';

interface VotePanelProps {
  battleId: string;
  playerA: BattlePlayer | null;
  playerB: BattlePlayer | null;
  votesA: number;
  votesB: number;
}

export function VotePanel({ battleId, playerA, playerB, votesA, votesB }: VotePanelProps) {
  const { votedFor, isVoting, sendVote } = useVoting(battleId);

  return (
    <Card className="grid gap-4 p-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
      <div className="text-center">
        <p className="mb-1 text-sm font-bold uppercase text-slate-400">{playerA?.username ?? 'Player A'}</p>
        <VoteCounter value={votesA} />
        <div className="mt-3">
          <VoteButton label="Votar A" disabled={!playerA || isVoting || Boolean(votedFor)} onVote={() => playerA && void sendVote(playerA.id)} />
        </div>
      </div>
      <div className="hidden font-display text-xl text-fuchsia-200 md:block">VS</div>
      <div className="text-center">
        <p className="mb-1 text-sm font-bold uppercase text-slate-400">{playerB?.username ?? 'Player B'}</p>
        <VoteCounter value={votesB} />
        <div className="mt-3">
          <VoteButton label="Votar B" disabled={!playerB || isVoting || Boolean(votedFor)} onVote={() => playerB && void sendVote(playerB.id)} />
        </div>
      </div>
    </Card>
  );
}
