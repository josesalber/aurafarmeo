import { Crown } from 'lucide-react';
import { Avatar } from '../ui/avatar';
import { Card } from '../ui/card';
import { AuraCounter } from '../aura/AuraCounter';
import { AuraProgress } from '../aura/AuraProgress';
import { VideoPlayer } from '../video/VideoPlayer';
import type { BattlePlayer } from '../../types/battle';

interface BattlePlayerCardProps {
  player: BattlePlayer | null;
  aura: number;
  opponentAura: number;
  videoEnabled: boolean;
  variant: 'a' | 'b';
}

export function BattlePlayerCard({ player, aura, opponentAura, videoEnabled, variant }: BattlePlayerCardProps) {
  if (!player) {
    return (
      <Card className="p-4">
        <div className="grid aspect-video place-items-center rounded-md border border-dashed border-white/20 text-slate-400">Esperando oponente...</div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden p-3">
      <VideoPlayer username={player.username} enabled={videoEnabled} variant={variant} />
      <div className="mt-3 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <Avatar src={player.avatar} fallback={player.username} />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <p className="truncate font-display text-lg text-white">{player.username}</p>
              {player.isLocal ? <span className="rounded-full bg-cyan-300 px-2 py-0.5 text-xs font-black text-slate-950">TU</span> : null}
            </div>
            <p className="flex items-center gap-1 text-xs font-bold uppercase text-slate-400">
              <Crown aria-hidden="true" className="size-3.5" />
              Fighter
            </p>
          </div>
        </div>
        <AuraCounter value={aura} label="aura" />
      </div>
      <div className="mt-3">
        <AuraProgress aura={aura} opponentAura={opponentAura} />
      </div>
    </Card>
  );
}
