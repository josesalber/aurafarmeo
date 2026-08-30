export interface User {
  id: number;
  username: string;
  email?: string;
  avatar: string | null;
  aura?: number;
  wins?: number;
}
