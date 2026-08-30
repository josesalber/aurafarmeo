import { VideoOff } from 'lucide-react';

export function VideoLoading({ label }: { label: string }) {
  return (
    <div className="flex aspect-video w-full items-center justify-center overflow-hidden rounded-md bg-[radial-gradient(circle_at_center,rgba(217,70,239,0.18),rgba(15,23,42,0.95)_62%)]">
      <div className="text-center text-slate-300">
        <VideoOff aria-hidden="true" className="mx-auto mb-2 size-8 text-fuchsia-200" />
        <p className="text-sm font-semibold">{label}</p>
      </div>
    </div>
  );
}
