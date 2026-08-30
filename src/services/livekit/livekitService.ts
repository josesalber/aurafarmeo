import { Room, RoomEvent, Track } from 'livekit-client';
import type { LiveKitConnection, LiveKitTokenResponse } from '../../types/livekit';

class LiveKitService {
  private room: Room | null = null;

  async connectToRoom(config: LiveKitTokenResponse, onReconnect?: (reconnecting: boolean) => void): Promise<LiveKitConnection | null> {
    const room = new Room({ adaptiveStream: true, dynacast: true });
    room.on(RoomEvent.Reconnecting, () => onReconnect?.(true));
    room.on(RoomEvent.Reconnected, () => onReconnect?.(false));
    await room.connect(config.serverUrl, config.token);
    this.room = room;
    return { room, localParticipant: room.localParticipant };
  }

  async disconnectFromRoom() {
    await this.room?.disconnect();
    this.room = null;
  }

  async publishCamera(enabled: boolean) {
    await this.room?.localParticipant.setCameraEnabled(enabled);
  }

  async publishMicrophone(enabled: boolean) {
    await this.room?.localParticipant.setMicrophoneEnabled(enabled);
  }

  subscribeToParticipant(onTrack: (track: Track, participantId: string) => void) {
    this.room?.on(RoomEvent.TrackSubscribed, (track, _publication, participant) => {
      onTrack(track, participant.identity);
    });
  }
}

export const liveKitService = new LiveKitService();
