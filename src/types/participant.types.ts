import { type Timestamp } from "firebase/firestore";
import { z } from "zod";

const participantRoles = ["owner", "admin", "player"] as const;
const participantStatuses = ["active", "left", "deleted"] as const;

export type ParticipantRole = (typeof participantRoles)[number];
export type ParticipantStatus = (typeof participantStatuses)[number];

export const ParticipantSchema = z.object({
  id: z.string(),
  sessionId: z.string(),
  uid: z.string(),
  displayName: z.string(),
  joinedAt: z.date(),
  deletedAt: z.date().nullable(),
  leftAt: z.date().nullable(),
  role: z.enum(participantRoles),
  status: z.enum(participantStatuses),
});

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

export interface CreateParticipantInput {
  sessionId: string;
  uid: string;
  displayName?: string;
  role: ParticipantRole;
}

export interface UpdateParticipantNameInput {
  participantId: string;
  name: string;
}

export interface RejoinSessionInput {
  sessionId: string;
  participantId: string;
}
