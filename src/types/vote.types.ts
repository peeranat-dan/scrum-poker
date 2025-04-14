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

export interface CastVoteInput {
  roundId: string;
  participantId: string;
  value: number;
}

export interface UpdateVoteInput {
  voteId: string;
  value: number;
}
