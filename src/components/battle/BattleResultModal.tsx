import { Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { formatNumber } from '../../lib/utils';
import type { BattlePlayer } from '../../types/battle';
import { Button } from '../ui/button';

interface BattleResultModalProps {
  winner: BattlePlayer | null;
  aura: number;
  votes: number;
}

export function BattleResultModal({ winner, aura, votes }: BattleResultModalProps) {
  return (
    <div className="fixed inset-0 z-30 grid place-items-center bg-black/75 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="battle-result-title">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-[min(520px,100%)] rounded-lg border border-fuchsia-300/40 bg-slate-950 p-8 text-center shadow-[0_0_80px_rgba(217,70,239,0.35)]"
      >
        <Trophy aria-hidden="true" className="mx-auto mb-4 size-16 text-amber-200" />
        <p className="text-sm font-black uppercase text-fuchsia-200">Ganador</p>
        <h2 id="battle-result-title" className="mt-2 font-display text-4xl text-white">{winner?.username ?? 'Player'}</h2>
        <div className="mt-6 grid grid-cols-2 gap-3 text-left">
          <div className="rounded-md bg-white/5 p-4">
            <p className="text-xs font-bold uppercase text-slate-400">Aura</p>
            <p className="font-display text-2xl text-white">{formatNumber(aura)}</p>
          </div>
          <div className="rounded-md bg-white/5 p-4">
            <p className="text-xs font-bold uppercase text-slate-400">Votos</p>
            <p className="font-display text-2xl text-white">{formatNumber(votes)}</p>
          </div>
        </div>
        <Button asChild className="mt-7 w-full">
          <Link to="/lobby">Volver al lobby</Link>
        </Button>
      </motion.div>
    </div>
  );
}
