import { Link, useParams } from 'react-router-dom';
import { Eye, Radio, Swords } from 'lucide-react';
import { useBattle } from '../hooks/useBattle';
import { useBattleSocket } from '../hooks/useBattleSocket';
import { useLiveKit } from '../hooks/useLiveKit';
import { useBattleStore } from '../store/battleStore';
import { useUiStore } from '../store/uiStore';
import { formatNumber } from '../lib/utils';
import { BattleLoading } from '../components/common/BattleLoading';
import { StatusPill } from '../components/common/StatusPill';
import { BattlePlayerCard } from '../components/battle/BattlePlayerCard';
import { BattleTimer } from '../components/battle/BattleTimer';
import { BattleChat } from '../components/battle/BattleChat';
import { BattleResultModal } from '../components/battle/BattleResultModal';
import { VotePanel } from '../components/voting/VotePanel';
import { MediaControls } from '../components/video/MediaControls';
import { Button } from '../components/ui/button';

export function BattlePage() {
  const { battleId } = useParams();
  const { isLoading } = useBattle(battleId);
  useBattleSocket(battleId);
  const liveKit = useLiveKit(battleId);
  const state = useBattleStore();
  const socketStatus = useUiStore((ui) => ui.socketStatus);

  if (!battleId || isLoading || !state.battle) {
    return <main className="mx-auto max-w-7xl px-4 py-8"><BattleLoading /></main>;
  }

  const winner = state.winnerId === state.playerA?.id ? state.playerA : state.playerB;
  const winnerAura = winner?.id === state.playerA?.id ? state.auraA : state.auraB;
  const winnerVotes = winner?.id === state.playerA?.id ? state.votesA : state.votesB;

  return (
    <main className="mx-auto max-w-7xl px-4 py-5">
      <header className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-white/10 bg-black/25 p-3">
        <div className="flex items-center gap-3">
          <Swords aria-hidden="true" className="size-6 text-fuchsia-300" />
          <div>
            <h1 className="font-display text-2xl text-white">AURA BATTLE</h1>
            <p className="flex items-center gap-2 text-sm text-slate-300">
              <Radio aria-hidden="true" className="size-3.5 text-rose-300" />
              LIVE
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <StatusPill connected={socketStatus === 'connected'} label={socketStatus === 'connected' ? 'Conectado' : 'Reconectando'} />
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-bold text-slate-200">
            <Eye aria-hidden="true" className="size-4" />
            {formatNumber(state.viewers)} espectadores
          </span>
          <BattleTimer seconds={state.remainingSeconds} />
        </div>
      </header>

      {state.status === 'WAITING' ? <div className="mb-4 rounded-lg border border-cyan-300/20 bg-cyan-300/10 p-4 text-cyan-100">Esperando oponente...</div> : null}
      {state.status === 'CANCELLED' ? <div className="mb-4 rounded-lg border border-rose-300/20 bg-rose-300/10 p-4 text-rose-100">La batalla fue cancelada.</div> : null}

      <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
        <section className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <BattlePlayerCard player={state.playerA} aura={state.auraA} opponentAura={state.auraB} videoEnabled={liveKit.cameraEnabled} variant="a" />
            <BattlePlayerCard player={state.playerB} aura={state.auraB} opponentAura={state.auraA} videoEnabled variant="b" />
          </div>
          <VotePanel battleId={battleId} playerA={state.playerA} playerB={state.playerB} votesA={state.votesA} votesB={state.votesB} />
        </section>
        <aside className="space-y-4">
          <div className="rounded-lg border border-white/10 bg-black/25 p-4">
            <h2 className="mb-3 font-display text-lg text-white">Controles</h2>
            <MediaControls
              cameraEnabled={liveKit.cameraEnabled}
              microphoneEnabled={liveKit.microphoneEnabled}
              onToggleCamera={() => void liveKit.toggleCamera()}
              onToggleMicrophone={() => void liveKit.toggleMicrophone()}
            />
          </div>
          <BattleChat battleId={battleId} />
          <Button asChild variant="secondary" className="w-full">
            <Link to="/lobby">Volver al lobby</Link>
          </Button>
        </aside>
      </div>

      {state.status === 'FINISHED' ? <BattleResultModal winner={winner ?? null} aura={winnerAura} votes={winnerVotes} /> : null}
    </main>
  );
}
