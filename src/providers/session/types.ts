import { type Session } from "@/domain/session/types";

export interface SessionProviderProps {
  sessionId: string;
  children: React.ReactNode;
}

export type SessionProviderState = Session;
