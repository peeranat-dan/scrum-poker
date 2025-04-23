import { type Timestamp } from "firebase/firestore";
import { type z } from "zod";
import {
  type CastVoteSchema,
  type UpdateVoteSchema,
  type VoteSchema,
} from "./schemas";

export type Vote = z.infer<typeof VoteSchema>;

export interface VoteDoc {
  roundId: string;
  participantId: string;
  value: number;
  castAt: Timestamp;
}

export type CastVoteInput = z.infer<typeof CastVoteSchema>;

export type UpdateVoteInput = z.infer<typeof UpdateVoteSchema>;
