import { type Session } from "@/types/session.types";

export interface SessionProviderProps {
  sessionId: string;
  children: React.ReactNode;
}

export type SessionProviderState = Session;
