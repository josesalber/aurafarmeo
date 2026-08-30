import type { LocalParticipant, Participant, RemoteParticipant, Room, TrackPublication } from 'livekit-client';

export interface LiveKitTokenResponse {
  serverUrl: string;
  token: string;
}

export interface LiveKitConnection {
  room: Room;
  localParticipant: LocalParticipant;
}

export interface ParticipantMedia {
  participant: Participant | RemoteParticipant | LocalParticipant;
  publication?: TrackPublication;
}

export type LiveKitStatus = 'idle' | 'connecting' | 'connected' | 'reconnecting' | 'disconnected' | 'error';
