import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { UserRound } from 'lucide-react';
import { cn } from '../../lib/utils';

interface AvatarProps {
  src: string | null;
  fallback: string;
  className?: string;
}

export function Avatar({ src, fallback, className }: AvatarProps) {
  return (
    <AvatarPrimitive.Root className={cn('flex size-10 items-center justify-center overflow-hidden rounded-full border border-white/15 bg-slate-800', className)}>
      {src ? <AvatarPrimitive.Image src={src} alt={fallback} className="size-full object-cover" /> : null}
      <AvatarPrimitive.Fallback className="flex items-center justify-center text-xs font-bold text-slate-200">
        {fallback.slice(0, 2).toUpperCase() || <UserRound aria-hidden="true" className="size-4" />}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
}
