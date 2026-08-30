import { Zap } from 'lucide-react';
import { formatNumber } from '../../lib/utils';

export function VoteCounter({ value }: { value: number }) {
  return (
    <span className="inline-flex items-center gap-2 font-display text-2xl text-white">
      <Zap aria-hidden="true" className="size-5 text-cyan-200" />
      {formatNumber(value)}
    </span>
  );
}
