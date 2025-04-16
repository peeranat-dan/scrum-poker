import { type Timestamp } from "firebase/firestore";

export interface Participant {
  id: string;
  sessionId: string;
  /**
   * The user's Firebase UID
   */
  uid: string;
  displayName: string;
  isOwner: boolean;
  joinedAt: Date;
  deletedAt: Date | null;
  leftAt: Date | null;
}

export interface ParticipantDoc {
  sessionId: string;
  uid: string;
  displayName: string;
  isOwner: boolean;
  joinedAt: Timestamp;
  deletedAt: Timestamp | null;
  leftAt: Timestamp | null;
}

export interface CreateParticipantInput {
  sessionId: string;
  uid: string;
  isOwner: boolean;
  displayName?: string;
}

export interface UpdateParticipantNameInput {
  participantId: string;
  name: string;
}
