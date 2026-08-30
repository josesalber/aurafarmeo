import { AnimatePresence, motion } from 'framer-motion';

export function AuraEffect({ delta }: { delta: number }) {
  return (
    <AnimatePresence>
      {delta > 0 ? (
        <motion.span
          key={delta}
          initial={{ opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: -18, scale: 1 }}
          exit={{ opacity: 0, y: -28 }}
          className="absolute right-0 top-0 text-sm font-black text-cyan-200"
        >
          +{delta}
        </motion.span>
      ) : null}
    </AnimatePresence>
  );
}
