import { ToastProvider } from '../../components/ui/toast';
import { LiveKitProvider } from './LiveKitProvider';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <LiveKitProvider>{children}</LiveKitProvider>
    </ToastProvider>
  );
}
