import { type User } from "@/types/user.types";

export interface AuthProviderProps {
  children: React.ReactNode;
}

export interface AuthProviderState {
  user: User | null;
  loading: boolean;
  signInAnonymously: () => Promise<void>;
}
