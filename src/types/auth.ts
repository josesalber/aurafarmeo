import type { User } from './user';

export interface GuestSession {
  user: User;
}

export interface GuestStartPayload {
  username: string;
}

export type SessionRole = 'FARMER' | 'JUROR';
