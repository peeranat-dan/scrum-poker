import { type Timestamp } from "firebase/firestore";

export interface Vote {
  id: string;
  roundId: string;
  participantId: string;
  value: number;
  castAt: Date;
}

export interface VoteDoc {
  roundId: string;
  participantId: string;
  value: number;
  castAt: Timestamp;
}
