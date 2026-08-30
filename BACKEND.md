# Backend Contract - FARMEAR AURA / Aura Battle

Frontend preparado para Spring Boot con REST API, WebSocket/STOMP y LiveKit token API. Actualmente no hay cuentas: el usuario escribe un nombre temporal y el frontend no lo persiste.

## Variables esperadas

```env
VITE_USE_MOCKS=false
VITE_API_URL=https://backend-aura-olha.onrender.com
VITE_WS_URL=wss://backend-aura-olha.onrender.com/ws
VITE_LIVEKIT_URL=wss://livekit.midominio.com
```

No enviar secretos por variables `VITE_*`. El token de LiveKit debe generarse en backend por batalla/usuario.

## REST

```http
GET  /api/battles
GET  /api/battles/{id}
POST /api/battles/{id}/join
POST /api/battles/{id}/leave
POST /api/battles/{id}/vote
GET  /api/battles/{id}/livekit-token
```

## Sesion temporal

No se requiere auth para frontend actual. Si backend decide identificar participantes, puede aceptar un `displayName` en `join` o emitir una identidad temporal desde `/api/battles/{id}/join`.

## Vote request

```json
{
  "fighterId": "123"
}
```

## LiveKit token response

```json
{
  "serverUrl": "wss://livekit.example.com",
  "token": "..."
}
```

## WebSocket/STOMP

Endpoint:

```text
/ws
```

Topics:

```text
/topic/battles/{battleId}
/topic/battles/{battleId}/chat
```

App destination para chat:

```text
/app/battles/{battleId}/chat
```

Eventos soportados:

```text
BATTLE_STARTED
BATTLE_TIMER
AURA_UPDATE
VOTE_UPDATE
PLAYER_JOINED
PLAYER_LEFT
VIEWERS_UPDATE
CHAT_MESSAGE
BATTLE_FINISHED
```

Frontend no calcula aura, votos, espectadores ni timer como fuente de verdad. Solo renderiza valores enviados por backend.
