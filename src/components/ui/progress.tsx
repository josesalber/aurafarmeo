import * as ProgressPrimitive from '@radix-ui/react-progress';
import { cn } from '../../lib/utils';

interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  value: number;
}

export function Progress({ className, value, ...props }: ProgressProps) {
  return (
    <ProgressPrimitive.Root className={cn('relative h-2 overflow-hidden rounded-full bg-slate-800', className)} {...props}>
      <ProgressPrimitive.Indicator
        className="h-full bg-gradient-to-r from-fuchsia-400 via-rose-400 to-cyan-300 transition-transform duration-500"
        style={{ transform: `translateX(-${100 - Math.min(100, Math.max(0, value))}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}
