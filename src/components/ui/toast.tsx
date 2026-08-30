import * as React from 'react';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

type ToastVariant = 'default' | 'destructive';

interface ToastOptions {
  title: string;
  description?: string;
  variant?: ToastVariant;
}

interface ToastItem extends ToastOptions {
  id: string;
}

interface ToastContextValue {
  toast: (options: ToastOptions) => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastItem[]>([]);

  const toast = React.useCallback((options: ToastOptions) => {
    const id = crypto.randomUUID();
    setToasts((current) => [...current, { id, ...options }].slice(-4));
    window.setTimeout(() => setToasts((current) => current.filter((item) => item.id !== id)), 3200);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      <ToastPrimitive.Provider swipeDirection="right">
        {children}
        {toasts.map((item) => (
          <ToastPrimitive.Root
            key={item.id}
            className={cn(
              'grid grid-cols-[1fr_auto] gap-3 rounded-md border p-4 text-sm text-white shadow-xl backdrop-blur-md',
              item.variant === 'destructive' ? 'border-rose-400/40 bg-rose-950/90' : 'border-fuchsia-300/30 bg-slate-950/90',
            )}
          >
            <div>
              <ToastPrimitive.Title className="font-bold">{item.title}</ToastPrimitive.Title>
              {item.description ? <ToastPrimitive.Description className="mt-1 text-slate-300">{item.description}</ToastPrimitive.Description> : null}
            </div>
            <ToastPrimitive.Close aria-label="Cerrar notificacion" className="cursor-pointer rounded-md p-1 hover:bg-white/10">
              <X aria-hidden="true" className="size-4" />
            </ToastPrimitive.Close>
          </ToastPrimitive.Root>
        ))}
        <ToastPrimitive.Viewport className="fixed right-4 top-4 z-50 flex w-[min(360px,calc(100vw-2rem))] flex-col gap-2 outline-none" />
      </ToastPrimitive.Provider>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) throw new Error('useToast must be used inside ToastProvider');
  return context;
}
