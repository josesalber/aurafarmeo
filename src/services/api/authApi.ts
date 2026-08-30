import type { GuestSession, GuestStartPayload } from '../../types/auth';

export async function startGuestSession(payload: GuestStartPayload): Promise<GuestSession> {
  return Promise.resolve({
    user: {
      id: Date.now(),
      username: payload.username.trim(),
      avatar: null,
    },
  });
}
