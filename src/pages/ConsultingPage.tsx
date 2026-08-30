import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Flame, KeyRound, Swords } from 'lucide-react';
import { enterFarmerQueue, enterPrivateRoom, enterRandomJury } from '../services/api/battleApi';
import { useAuthStore } from '../store/authStore';
import { useUiStore } from '../store/uiStore';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Spinner } from '../components/ui/skeleton';

type Action = 'farmer' | 'juror' | 'private' | null;

export function ConsultingPage() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const setRole = useAuthStore((state) => state.setRole);
  const setError = useUiStore((state) => state.setError);
  const [roomCode, setRoomCode] = useState('');
  const [action, setAction] = useState<Action>(null);

  const displayName = user?.username ?? 'Invitado';

  const goToBattle = async (nextAction: Exclude<Action, null>) => {
    setAction(nextAction);
    try {
      if (nextAction === 'farmer') {
        setRole('FARMER');
        const response = await enterFarmerQueue(displayName);
        void navigate(`/battle/${response.battleId}`);
        return;
      }

      setRole('JUROR');
      const response = nextAction === 'private'
        ? await enterPrivateRoom(roomCode.trim(), displayName)
        : await enterRandomJury(displayName);
      void navigate(`/battle/${response.battleId}`);
    } catch {
      setError('No pudimos entrar a la batalla. Revisa que el backend este disponible.');
    } finally {
      setAction(null);
    }
  };

  const onPrivateSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!roomCode.trim()) {
      setError('Escribe codigo de sala privada.');
      return;
    }
    void goToBattle('private');
  };

  return (
    <main className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-5xl place-items-center px-4 py-8">
      <Card className="w-full overflow-hidden">
        <CardHeader className="border-b border-white/10 bg-black/20">
          <img src="/logo.png" alt="FARMEAR AURA" className="mb-4 size-16 rounded-lg object-contain" />
          <p className="text-sm font-black uppercase text-fuchsia-200">Consultando: {displayName}</p>
          <h1 className="mt-2 font-display text-4xl text-white">¿Que quieres hacer?</h1>
        </CardHeader>
        <CardContent className="grid gap-4 p-5 md:grid-cols-2">
          <button
            type="button"
            onClick={() => void goToBattle('farmer')}
            disabled={action !== null}
            className="min-h-56 cursor-pointer rounded-lg border border-fuchsia-300/30 bg-fuchsia-400/10 p-5 text-left transition hover:-translate-y-1 hover:bg-fuchsia-400/15 disabled:pointer-events-none disabled:opacity-60"
          >
            <Flame aria-hidden="true" className="mb-5 size-10 text-rose-200" />
            <span className="font-display text-3xl text-white">FARMEAR AURA</span>
            <span className="mt-3 block text-slate-300">Entrar directo a cola y esperar contrincante.</span>
            {action === 'farmer' ? <Spinner className="mt-5" /> : <Swords aria-hidden="true" className="mt-5 size-6 text-cyan-200" />}
          </button>

          <div className="rounded-lg border border-cyan-300/25 bg-cyan-300/10 p-5">
            <Eye aria-hidden="true" className="mb-5 size-10 text-cyan-200" />
            <h2 className="font-display text-3xl text-white">SER JURADO</h2>
            <p className="mt-3 text-slate-300">Entrar a una batalla disponible para votar.</p>
            <Button type="button" className="mt-5 w-full" variant="secondary" disabled={action !== null} onClick={() => void goToBattle('juror')}>
              {action === 'juror' ? <Spinner className="size-4" /> : <Eye aria-hidden="true" className="size-4" />}
              Entrar como jurado
            </Button>

            <form onSubmit={onPrivateSubmit} className="mt-5 space-y-3">
              <Label htmlFor="roomCode">Sala privada</Label>
              <div className="flex gap-2">
                <Input id="roomCode" value={roomCode} onChange={(event) => setRoomCode(event.target.value.toUpperCase())} placeholder="CODIGO" maxLength={12} />
                <Button type="submit" size="icon" variant="ghost" aria-label="Entrar por codigo" disabled={action !== null}>
                  {action === 'private' ? <Spinner className="size-4" /> : <KeyRound aria-hidden="true" className="size-4" />}
                </Button>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
