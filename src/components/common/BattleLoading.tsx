import { Skeleton, Spinner } from '../ui/skeleton';

export function BattleLoading() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
        <Skeleton className="aspect-video w-full" />
        <Skeleton className="mt-4 h-12 w-2/3" />
      </div>
      <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
        <Skeleton className="aspect-video w-full" />
        <Skeleton className="mt-4 h-12 w-2/3" />
      </div>
      <div className="col-span-full flex items-center justify-center gap-3 py-8 text-slate-300">
        <Spinner />
        Preparando arena
      </div>
    </div>
  );
}
