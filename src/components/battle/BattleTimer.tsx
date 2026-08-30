import { Timer } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCountdown } from '../../hooks/useCountdown';

export function BattleTimer({ seconds }: { seconds: number }) {
  const label = useCountdown(seconds);
  return (
    <motion.div
      key={label}
      initial={{ scale: 0.96 }}
      animate={{ scale: 1 }}
      className="inline-flex min-w-28 items-center justify-center gap-2 rounded-md border border-fuchsia-300/30 bg-fuchsia-300/10 px-4 py-2 font-display text-2xl text-white"
      aria-live="polite"
    >
      <Timer aria-hidden="true" className="size-5 text-fuchsia-200" />
      {label}
    </motion.div>
  );
}
