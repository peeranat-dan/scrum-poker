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
}

export interface ParticipantDoc {
  sessionId: string;
  uid: string;
  displayName: string;
  isOwner: boolean;
  joinedAt: Timestamp;
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
