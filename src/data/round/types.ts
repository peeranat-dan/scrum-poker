import { type Timestamp } from "firebase/firestore";
import { type z } from "zod";
import {
  type RoundSchema,
  type roundStatuses,
  type UpdateRoundSchema,
} from "./schemas";

export type Round = z.infer<typeof RoundSchema>;
export type RoundStatus = (typeof roundStatuses)[number];

export interface RoundDoc {
  sessionId: string;
  status: RoundStatus;
  revealedAt: Timestamp | null;
  averageVote: number | null;
  finishedAt: Timestamp | null;
}

export type UpdateRoundInput = z.infer<typeof UpdateRoundSchema>;
