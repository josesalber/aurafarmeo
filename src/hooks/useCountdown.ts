import { formatTimer } from '../lib/utils';

export function useCountdown(seconds: number) {
  return formatTimer(seconds);
}
