import { Eye, Flame, Radio } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatNumber } from '../../lib/utils';
import type { BattleSummary } from '../../types/battle';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

export function BattleCard({ battle }: { battle: BattleSummary }) {
  return (
    <Card className="p-5 transition duration-200 hover:-translate-y-1 hover:border-fuchsia-300/40">
      <div className="mb-5 flex items-center justify-between">
        <span className="inline-flex items-center gap-2 rounded-full bg-rose-500/15 px-3 py-1 text-xs font-black uppercase text-rose-200">
          <Radio aria-hidden="true" className="size-3.5" />
          {battle.status === 'ACTIVE' ? 'En vivo' : battle.status}
        </span>
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-slate-300">
          <Eye aria-hidden="true" className="size-4" />
          {formatNumber(battle.viewers)}
        </span>
      </div>
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-center">
        <div>
          <p className="truncate font-display text-xl text-white">{battle.playerA?.username ?? 'Esperando'}</p>
          <p className="mt-2 inline-flex items-center gap-1 text-rose-200">
            <Flame aria-hidden="true" className="size-4" />
            {formatNumber(battle.playerA?.aura ?? 0)}
          </p>
        </div>
        <span className="font-display text-fuchsia-200">VS</span>
        <div>
          <p className="truncate font-display text-xl text-white">{battle.playerB?.username ?? 'Esperando'}</p>
          <p className="mt-2 inline-flex items-center gap-1 text-rose-200">
            <Flame aria-hidden="true" className="size-4" />
            {formatNumber(battle.playerB?.aura ?? 0)}
          </p>
        </div>
      </div>
      <Button asChild className="mt-6 w-full">
        <Link to={`/battle/${battle.id}`}>Entrar</Link>
      </Button>
    </Card>
  );
}
