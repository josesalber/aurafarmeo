import { Radio } from 'lucide-react';
import { useBattles } from '../hooks/useBattle';
import { BattleCard } from '../components/lobby/BattleCard';
import { Skeleton } from '../components/ui/skeleton';

export function LobbyPage() {
  const { battles, isLoading } = useBattles();

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-rose-500/15 px-3 py-1 text-xs font-black uppercase text-rose-100">
            <Radio aria-hidden="true" className="size-3.5" />
            Arena abierta
          </p>
          <h1 className="font-display text-4xl text-white md:text-5xl">BATALLAS EN VIVO</h1>
        </div>
        <p className="max-w-md text-slate-300">Multiples arenas simultaneas, votos en tiempo real y aura subiendo segundo a segundo.</p>
      </div>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3].map((item) => <Skeleton key={item} className="h-72" />)}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {battles.map((battle) => <BattleCard key={battle.id} battle={battle} />)}
        </div>
      )}
    </main>
  );
}
