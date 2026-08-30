import { Link, NavLink, Outlet } from 'react-router-dom';
import { Swords, UserRound } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/button';
import { ErrorBanner } from '../components/common/ErrorBanner';

export function MainLayout() {
  const { isAuthenticated, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-aura-radial text-white">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4" aria-label="Navegacion principal">
          <Link to="/" className="flex items-center gap-2 font-display text-xl text-white">
            <Swords aria-hidden="true" className="size-5 text-fuchsia-300" />
            FARMEAR AURA
          </Link>
          <div className="flex items-center gap-2">
            <NavLink to="/lobby" className={({ isActive }) => `rounded-md px-3 py-2 text-sm font-bold uppercase ${isActive ? 'bg-white/10 text-cyan-100' : 'text-slate-300 hover:text-white'}`}>
              Batallas
            </NavLink>
            <NavLink to="/profile" className={({ isActive }) => `hidden rounded-md px-3 py-2 text-sm font-bold uppercase sm:flex ${isActive ? 'bg-white/10 text-cyan-100' : 'text-slate-300 hover:text-white'}`}>
              <UserRound aria-hidden="true" className="mr-2 size-4" />
              Perfil
            </NavLink>
            {isAuthenticated ? (
              <Button type="button" variant="ghost" onClick={signOut}>Salir</Button>
            ) : (
              <Button asChild>
                <Link to="/login">Entrar</Link>
              </Button>
            )}
          </div>
        </nav>
      </header>
      <Outlet />
      <ErrorBanner />
    </div>
  );
}
