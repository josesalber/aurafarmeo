import { create } from 'zustand';
import type { SessionRole } from '../types/auth';
import type { User } from '../types/user';

interface AuthState {
  user: User | null;
  role: SessionRole | null;
  isAuthenticated: boolean;
  setGuest: (user: User) => void;
  setRole: (role: SessionRole) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  role: null,
  isAuthenticated: false,
  setGuest: (user) => {
    set({ user, isAuthenticated: true });
  },
  setRole: (role) => {
    set({ role });
  },
  logout: () => {
    set({ user: null, role: null, isAuthenticated: false });
  },
}));
