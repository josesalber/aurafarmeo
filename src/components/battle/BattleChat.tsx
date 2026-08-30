import { useState, type FormEvent } from 'react';
import { Send } from 'lucide-react';
import { battleSocket } from '../../services/websocket/battleSocket';
import { useAuthStore } from '../../store/authStore';
import { useBattleStore } from '../../store/battleStore';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export function BattleChat({ battleId }: { battleId: string }) {
  const messages = useBattleStore((state) => state.chatMessages);
  const user = useAuthStore((state) => state.user);
  const [message, setMessage] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = message.trim();
    if (!trimmed) return;
    battleSocket.sendChatMessage(battleId, user?.username ?? 'Invitado', trimmed);
    setMessage('');
  };

  return (
    <section className="rounded-lg border border-white/10 bg-black/25 p-4">
      <h2 className="mb-3 font-display text-lg text-white">CHAT</h2>
      <div className="h-48 space-y-2 overflow-y-auto pr-1" aria-live="polite">
        {messages.map((item) => (
          <p key={item.id} className="text-sm text-slate-300">
            <span className="font-bold text-cyan-200">{item.username}:</span> {item.message}
          </p>
        ))}
      </div>
      <form onSubmit={onSubmit} className="mt-3 flex gap-2">
        <Input aria-label="Mensaje de chat" value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Escribe un mensaje..." />
        <Button type="submit" size="icon" aria-label="Enviar mensaje">
          <Send aria-hidden="true" className="size-4" />
        </Button>
      </form>
    </section>
  );
}
