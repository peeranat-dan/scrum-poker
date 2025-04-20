import { type Session } from "@/data/session/types";

export interface SessionProviderProps {
  sessionId: string;
  children: React.ReactNode;
}

export type SessionProviderState = Session;
