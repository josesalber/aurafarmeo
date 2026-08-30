import { Crown, Flame } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { Card } from '../components/ui/card';
import { Avatar } from '../components/ui/avatar';
import { formatNumber } from '../lib/utils';

export function ProfilePage() {
  const user = useAuthStore((state) => state.user);

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-6 font-display text-4xl text-white">Perfil</h1>
      <Card className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center">
        <Avatar src={user?.avatar ?? null} fallback={user?.username ?? 'PL'} className="size-20" />
        <div className="flex-1">
          <p className="font-display text-3xl text-white">{user?.username ?? 'Player'}</p>
          <p className="text-slate-400">{user?.email ?? 'Sesion temporal'}</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-md bg-white/5 p-4">
            <p className="flex items-center gap-2 text-xs font-bold uppercase text-slate-400"><Flame aria-hidden="true" className="size-4" /> Aura</p>
            <p className="font-display text-2xl text-white">{formatNumber(user?.aura ?? 0)}</p>
          </div>
          <div className="rounded-md bg-white/5 p-4">
            <p className="flex items-center gap-2 text-xs font-bold uppercase text-slate-400"><Crown aria-hidden="true" className="size-4" /> Wins</p>
            <p className="font-display text-2xl text-white">{formatNumber(user?.wins ?? 0)}</p>
          </div>
        </div>
      </Card>
    </main>
  );
}
