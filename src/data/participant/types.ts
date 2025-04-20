import { type Timestamp } from "firebase/firestore";
import { type z } from "zod";
import {
  type CreateParticipantSchema,
  type participantRoles,
  type ParticipantSchema,
  type participantStatuses,
  type RejoinSessionSchema,
  type UpdateParticipantNameSchema,
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

export type CreateParticipantInput = z.infer<typeof CreateParticipantSchema>;

export type RejoinSessionInput = z.infer<typeof RejoinSessionSchema>;

export type UpdateParticipantNameInput = z.infer<
  typeof UpdateParticipantNameSchema
>;
