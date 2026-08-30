import { Flame } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { formatNumber } from '../../lib/utils';
import { AuraEffect } from './AuraEffect';

export function AuraCounter({ value, label }: { value: number; label?: string }) {
  const previous = useRef(value);
  const [delta, setDelta] = useState(0);

  useEffect(() => {
    const nextDelta = value - previous.current;
    if (nextDelta > 0) {
      setDelta(nextDelta);
      window.setTimeout(() => setDelta(0), 900);
    }
    previous.current = value;
  }, [value]);

  return (
    <div className="relative inline-flex items-center gap-2">
      <Flame aria-hidden="true" className="size-5 text-rose-300" />
      <span className="text-2xl font-black text-white md:text-3xl">{formatNumber(value)}</span>
      {label ? <span className="text-sm font-bold uppercase text-slate-400">{label}</span> : null}
      <AuraEffect delta={delta} />
    </div>
  );
}
