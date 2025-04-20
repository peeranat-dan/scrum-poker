import { type Timestamp } from "firebase/firestore";
import { type z } from "zod";
import {
  type participantRoles,
  type ParticipantSchema,
  type participantStatuses,
} from "./schemas";

export type ParticipantRole = (typeof participantRoles)[number];
export type ParticipantStatus = (typeof participantStatuses)[number];
export type Participant = z.infer<typeof ParticipantSchema>;

export interface ParticipantDoc {
  sessionId: string;
  uid: string;
  displayName: string;
  joinedAt: Timestamp;
  deletedAt: Timestamp | null;
  leftAt: Timestamp | null;
  role: ParticipantRole;
  status: ParticipantStatus;
}
