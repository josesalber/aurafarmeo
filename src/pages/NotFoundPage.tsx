import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

export function NotFoundPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-aura-radial px-4 text-center text-white">
      <div>
        <p className="font-display text-7xl text-fuchsia-200">404</p>
        <h1 className="mt-3 font-display text-3xl">Arena no encontrada</h1>
        <Button asChild className="mt-6">
          <Link to="/">Volver al inicio</Link>
        </Button>
      </div>
    </main>
  );
}
