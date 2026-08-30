import { useEffect, useState } from 'react';
import { getLiveKitToken } from '../services/api/battleApi';
import { liveKitService } from '../services/livekit/livekitService';
import { useUiStore } from '../store/uiStore';
import { useToast } from '../components/ui/toast';

export function useLiveKit(battleId: string | undefined) {
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [microphoneEnabled, setMicrophoneEnabled] = useState(false);
  const setLiveKitStatus = useUiStore((state) => state.setLiveKitStatus);
  const { toast } = useToast();

  useEffect(() => {
    if (!battleId) return undefined;
    let mounted = true;
    setLiveKitStatus('connecting');
    getLiveKitToken(battleId)
      .then((config) => liveKitService.connectToRoom(config, (reconnecting) => setLiveKitStatus(reconnecting ? 'reconnecting' : 'connected')))
      .then(() => mounted && setLiveKitStatus('connected'))
      .catch(() => mounted && setLiveKitStatus('error'));

    return () => {
      mounted = false;
      void liveKitService.disconnectFromRoom();
      setLiveKitStatus('disconnected');
    };
  }, [battleId, setLiveKitStatus]);

  const toggleCamera = async () => {
    const next = !cameraEnabled;
    await liveKitService.publishCamera(next);
    setCameraEnabled(next);
    toast({ title: next ? 'Camara activada' : 'Camara desactivada' });
  };

  const toggleMicrophone = async () => {
    const next = !microphoneEnabled;
    await liveKitService.publishMicrophone(next);
    setMicrophoneEnabled(next);
    toast({ title: next ? 'Microfono activado' : 'Microfono desactivado' });
  };

  return { cameraEnabled, microphoneEnabled, toggleCamera, toggleMicrophone };
}
