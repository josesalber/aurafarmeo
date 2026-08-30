import { Wifi, WifiOff } from 'lucide-react';
import { cn } from '../../lib/utils';

interface StatusPillProps {
  connected: boolean;
  label: string;
}

export function StatusPill({ connected, label }: StatusPillProps) {
  const Icon = connected ? Wifi : WifiOff;
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold uppercase',
        connected ? 'border-emerald-300/30 bg-emerald-300/10 text-emerald-200' : 'border-rose-300/30 bg-rose-300/10 text-rose-200',
      )}
    >
      <Icon aria-hidden="true" className="size-3.5" />
      {label}
    </span>
  );
}
