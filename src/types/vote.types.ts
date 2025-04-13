import { type Timestamp } from "firebase/firestore";

export interface Vote {
  id: string;
  sessionId: string;
  roundId: string;
  participantId: string;
  value: number;
  castAt: Date;
}

export interface VoteDoc {
  sessionId: string;
  roundId: string;
  participantId: string;
  value: number;
  castAt: Timestamp;
}
