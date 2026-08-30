import { Progress } from '../ui/progress';

export function AuraProgress({ aura, opponentAura }: { aura: number; opponentAura: number }) {
  const total = Math.max(1, aura + opponentAura);
  return <Progress value={(aura / total) * 100} aria-label="Progreso de aura" />;
}
