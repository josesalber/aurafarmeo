function readEnv(value: string | undefined, fallback: string) {
  return value && value.length > 0 ? value : fallback;
}

export const API_URL = readEnv(import.meta.env.VITE_API_URL, 'https://backend-aura-olha.onrender.com');
export const WS_URL = readEnv(import.meta.env.VITE_WS_URL, 'wss://backend-aura-olha.onrender.com/ws');
export const LIVEKIT_URL = readEnv(import.meta.env.VITE_LIVEKIT_URL, 'wss://your-livekit-server');
export const BATTLE_DURATION_SECONDS = 300;
export const MAX_CHAT_MESSAGES = 80;
