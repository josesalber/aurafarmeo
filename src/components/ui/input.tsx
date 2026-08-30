import * as React from 'react';
import { cn } from '../../lib/utils';

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      'h-12 w-full rounded-md border border-white/10 bg-slate-950/70 px-4 text-base text-white outline-none transition placeholder:text-slate-500 focus:border-fuchsia-300 focus:ring-2 focus:ring-fuchsia-300/30',
      className,
    )}
    {...props}
  />
));
Input.displayName = 'Input';
