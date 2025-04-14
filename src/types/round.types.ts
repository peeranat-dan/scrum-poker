import { type Timestamp } from "firebase/firestore";

export type RoundStatus = "in-progress" | "revealed";

export interface Round {
  id: string;
  sessionId: string;
  status: RoundStatus;
  revealedAt: Date | null;
  averageVote: number | null;
}

export interface RoundDoc {
  sessionId: string;
  status: RoundStatus;
  revealedAt: Timestamp | null;
  averageVote: number | null;
}

export interface UpdateRoundInput {
  id: string;
  status?: RoundStatus;
  revealedAt?: Date | null;
  averageVote?: number | null;
}
