import { type FirestoreDoc } from "@/shared/firestore/types";

export const participantRoles = ["owner", "admin", "player"] as const;
export const participantStatuses = ["active", "left", "removed"] as const;

export type ParticipantRole = (typeof participantRoles)[number];
export type ParticipantStatus = (typeof participantStatuses)[number];

export interface BaseParticipantDoc {
  sessionId: string;
  uid: string;
  displayName: string;
  role: ParticipantRole;
  status: ParticipantStatus;
}

export type ParticipantDoc = Prettify<FirestoreDoc<BaseParticipantDoc>>;

export type AddParticipantInput = BaseParticipantDoc;

export type UpdateParticipantInput = Partial<ParticipantDoc>;

export type FilterParticipantInput = Partial<ParticipantDoc>;
