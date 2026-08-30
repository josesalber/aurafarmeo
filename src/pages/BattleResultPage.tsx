import { Link } from 'react-router-dom';
import { Trophy } from 'lucide-react';
import { Button } from '../components/ui/button';

export function BattleResultPage() {
  return (
    <main className="grid min-h-[calc(100vh-4rem)] place-items-center px-4 text-center">
      <div>
        <Trophy aria-hidden="true" className="mx-auto mb-4 size-16 text-amber-200" />
        <h1 className="font-display text-4xl text-white">Resultado de batalla</h1>
        <p className="mt-3 text-slate-300">El resultado en vivo aparece al terminar la arena.</p>
        <Button asChild className="mt-6">
          <Link to="/lobby">Volver al lobby</Link>
        </Button>
      </div>
    </main>
  );
}
