import { cn } from '../../lib/utils';

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn('animate-pulse rounded-md bg-white/10', className)} />;
}

export function Spinner({ className }: { className?: string }) {
  return <div className={cn('size-6 animate-spin rounded-full border-2 border-fuchsia-300 border-t-transparent', className)} aria-label="Cargando" />;
}
