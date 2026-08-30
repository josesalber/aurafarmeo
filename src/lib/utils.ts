import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat('es-CO').format(value);
}

export function formatTimer(seconds: number) {
  const safeSeconds = Math.max(0, seconds);
  const minutes = Math.floor(safeSeconds / 60).toString().padStart(2, '0');
  const remaining = (safeSeconds % 60).toString().padStart(2, '0');
  return `${minutes}:${remaining}`;
}

export function getFriendlyError(status?: number) {
  if (status === 401 || status === 403) return 'No tienes permiso para realizar esta accion.';
  if (status === 404) return 'La batalla ya termino o no existe.';
  return 'No pudimos conectarnos al servidor.';
}
