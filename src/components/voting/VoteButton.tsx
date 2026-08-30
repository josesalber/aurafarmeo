import { Zap } from 'lucide-react';
import { Button } from '../ui/button';

interface VoteButtonProps {
  label: string;
  disabled: boolean;
  onVote: () => void;
}

export function VoteButton({ label, disabled, onVote }: VoteButtonProps) {
  return (
    <Button type="button" size="lg" disabled={disabled} onClick={onVote} className="w-full">
      <Zap aria-hidden="true" className="size-5" />
      {label}
    </Button>
  );
}
