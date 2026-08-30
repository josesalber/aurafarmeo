# FARMEAR AURA - Aura Battle

Frontend React + TypeScript para batallas en vivo con camaras, aura, votos y chat. No requiere cuenta: se entra con nombre temporal en memoria.

## Instalacion

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Lint

```bash
npm run lint
```

## Arquitectura

`src/pages` contiene rutas principales. `src/components` separa UI base, batalla, video, votos, aura, lobby y comunes. `src/store` usa Zustand para auth temporal, batalla y estado UI. `src/services` contiene REST, WebSocket/STOMP y LiveKit aislados.

## Variables

Copiar `.env.example` a `.env` si quieres cambiar entorno.

```env
VITE_API_URL=https://backend-aura-olha.onrender.com
VITE_WS_URL=wss://backend-aura-olha.onrender.com/ws
VITE_LIVEKIT_URL=wss://your-livekit-server
VITE_USE_MOCKS=false
```

## Backend Render

La app consume backend real por defecto:

```env
VITE_USE_MOCKS=false
VITE_API_URL=https://backend-aura-olha.onrender.com
VITE_WS_URL=wss://backend-aura-olha.onrender.com/ws
```

## API

Axios esta centralizado en `src/services/api/axios.ts`. Los componentes consumen `battleApi` y `userApi`, no Axios directamente. La sesion actual no persiste.

## WebSocket

`src/services/websocket/websocketClient.ts` usa `@stomp/stompjs`, reconexion automatica y topics `/topic/battles/{battleId}` y `/topic/battles/{battleId}/chat`.

## LiveKit

`src/services/livekit/livekitService.ts` encapsula `Room`, conexion, desconexion, camara y microfono. El backend debe entregar `serverUrl` y `token` desde `/api/battles/{id}/livekit-token`.

## Backend

Ver `BACKEND.md` para contrato REST, STOMP y LiveKit esperado.
