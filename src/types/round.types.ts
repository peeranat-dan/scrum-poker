import { type Timestamp } from "firebase/firestore";

export type RoundStatus = "in-progress" | "revealed";

export interface Round {
  id: string;
  sessionId: string;
  status: RoundStatus;
  revealedAt: Date | null;
}

export interface RoundDoc {
  sessionId: string;
  status: RoundStatus;
  revealedAt: Timestamp | null;
}
