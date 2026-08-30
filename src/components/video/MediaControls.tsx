import { Camera, CameraOff, Mic, MicOff } from 'lucide-react';
import { Button } from '../ui/button';

interface MediaControlsProps {
  cameraEnabled: boolean;
  microphoneEnabled: boolean;
  onToggleCamera: () => void;
  onToggleMicrophone: () => void;
}

export function MediaControls({ cameraEnabled, microphoneEnabled, onToggleCamera, onToggleMicrophone }: MediaControlsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Button type="button" variant={cameraEnabled ? 'secondary' : 'ghost'} onClick={onToggleCamera} aria-pressed={cameraEnabled}>
        {cameraEnabled ? <Camera aria-hidden="true" className="size-4" /> : <CameraOff aria-hidden="true" className="size-4" />}
        Camara
      </Button>
      <Button type="button" variant={microphoneEnabled ? 'secondary' : 'ghost'} onClick={onToggleMicrophone} aria-pressed={microphoneEnabled}>
        {microphoneEnabled ? <Mic aria-hidden="true" className="size-4" /> : <MicOff aria-hidden="true" className="size-4" />}
        Microfono
      </Button>
    </div>
  );
}
