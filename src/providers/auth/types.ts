import { type User, type UserCredential } from '@/shared/firebase/types';

export interface AuthProviderProps {
  children: React.ReactNode;
}

export interface AuthProviderState {
  user: User | null;
  loading: boolean;
  signInAnonymously: () => Promise<UserCredential>;
  signOut: () => Promise<void>;
}
