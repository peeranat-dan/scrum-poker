import { type Timestamp } from "firebase/firestore";

export type ParticipantRole = "owner" | "admin" | "player";

export interface Participant {
  id: string;
  sessionId: string;
  /**
   * The user's Firebase UID
   */
  uid: string;
  displayName: string;
  joinedAt: Date;
  deletedAt: Date | null;
  leftAt: Date | null;
  role: ParticipantRole;
}

export interface ParticipantDoc {
  sessionId: string;
  uid: string;
  displayName: string;
  joinedAt: Timestamp;
  deletedAt: Timestamp | null;
  leftAt: Timestamp | null;
  role: ParticipantRole;
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
