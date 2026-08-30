import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';
import { cn } from '../../lib/utils';

interface VideoPlayerProps {
  username: string;
  enabled: boolean;
  variant: 'a' | 'b';
}

export function VideoPlayer({ username, enabled, variant }: VideoPlayerProps) {
  if (!enabled) {
    return (
      <div className="flex aspect-video w-full items-center justify-center rounded-md bg-slate-950">
        <div className="text-center text-slate-400">
          <Camera aria-hidden="true" className="mx-auto mb-2 size-8" />
          Camara apagada
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-md bg-slate-950">
      <motion.div
        className={cn(
          'absolute inset-0 opacity-80',
          variant === 'a'
            ? 'bg-[conic-gradient(from_90deg,rgba(217,70,239,0.7),rgba(34,211,238,0.35),rgba(15,23,42,0.9),rgba(217,70,239,0.7))]'
            : 'bg-[conic-gradient(from_270deg,rgba(244,63,94,0.65),rgba(34,211,238,0.35),rgba(15,23,42,0.9),rgba(244,63,94,0.65))]',
        )}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}
      />
      <div className="absolute inset-2 rounded-md bg-black/45" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="grid size-28 place-items-center rounded-full border border-white/20 bg-white/10 text-3xl font-black text-white shadow-[0_0_40px_rgba(217,70,239,0.45)]">
          {username.slice(0, 2).toUpperCase()}
        </div>
      </div>
      <div className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs font-bold text-cyan-100">LIVEKIT</div>
    </div>
  );
}
