import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as authApi from '../services/api/authApi';
import { useAuthStore } from '../store/authStore';
import { useToast } from '../components/ui/toast';
import type { GuestStartPayload } from '../types/auth';

export function useAuth() {
  const navigate = useNavigate();
  const { setGuest, logout, ...auth } = useAuthStore();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const startGuest = async (payload: GuestStartPayload) => {
    setIsLoading(true);
    try {
      const response = await authApi.startGuestSession(payload);
      setGuest(response.user);
      void navigate('/consultando');
    } catch {
      toast({ title: 'No pudimos entrar a la arena', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    logout();
    void navigate('/');
  };

  return { ...auth, isLoading, startGuest, signOut };
}
