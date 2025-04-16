import {
  type Participant,
  type ParticipantDoc,
} from "@/types/participant.types";
import { type DocumentData, type DocumentSnapshot } from "firebase/firestore";

export function participantConverter(
  doc: DocumentSnapshot<ParticipantDoc, DocumentData>
): Participant {
  const data = doc.data();

  if (!data) {
    throw new Error("Participant not found");
  }

  return {
    id: doc.id,
    displayName: data.displayName,
    isOwner: data.isOwner,
    joinedAt: data.joinedAt.toDate(),
    sessionId: data.sessionId,
    uid: data.uid,
    deletedAt: data.deletedAt ? data.deletedAt.toDate() : null,
    leavedAt: data.leavedAt ? data.leavedAt.toDate() : null,
  };
}
