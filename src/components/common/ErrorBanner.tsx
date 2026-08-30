import { AlertTriangle } from 'lucide-react';
import { useUiStore } from '../../store/uiStore';
import { Button } from '../ui/button';

export function ErrorBanner() {
  const error = useUiStore((state) => state.error);
  const setError = useUiStore((state) => state.setError);
  if (!error) return null;

  return (
    <div role="alert" className="fixed bottom-4 left-1/2 z-40 flex w-[min(680px,calc(100vw-2rem))] -translate-x-1/2 items-center justify-between gap-3 rounded-md border border-rose-300/30 bg-rose-950/90 p-3 text-sm text-white shadow-xl">
      <span className="flex items-center gap-2">
        <AlertTriangle aria-hidden="true" className="size-4 text-rose-200" />
        {error}
      </span>
      <Button type="button" variant="ghost" size="icon" aria-label="Cerrar error" onClick={() => setError(null)}>
        ×
      </Button>
    </div>
  );
}
