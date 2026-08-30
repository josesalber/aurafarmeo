import { useState, type FormEvent } from 'react';
import { Gamepad2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Spinner } from '../components/ui/skeleton';

export function LoginPage() {
  const { startGuest, isLoading } = useAuth();
  const [username, setUsername] = useState('');
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = username.trim();
    if (!trimmed) {
      setError('Escribe un nombre para entrar.');
      return;
    }
    setError(null);
    void startGuest({ username: trimmed });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <Gamepad2 aria-hidden="true" className="mb-4 size-8 text-fuchsia-300" />
        <h1 className="font-display text-3xl text-white">Entrar a la arena</h1>
        <p className="mt-2 text-slate-400">Solo escribe tu nombre. Nada se guarda.</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4" noValidate>
          <div>
            <Label htmlFor="username">Nombre</Label>
            <Input
              id="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
              autoComplete="nickname"
              aria-invalid={Boolean(error)}
              aria-describedby={error ? 'username-error' : undefined}
              maxLength={24}
              placeholder="Tu nombre en la batalla"
            />
            {error ? <p id="username-error" role="alert" className="mt-1 text-sm text-rose-200">{error}</p> : null}
          </div>
          <Button type="submit" className="w-full" disabled={isLoading} aria-busy={isLoading}>
            {isLoading ? <Spinner className="size-4" /> : null}
            Entrar ahora
          </Button>
        </form>
        <p className="mt-5 text-center text-sm text-slate-400">Sesion temporal en memoria. Al recargar, vuelves a escribir nombre.</p>
      </CardContent>
    </Card>
  );
}
