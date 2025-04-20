import { assertValid } from "@/shared/zod/utils";
import { type DocumentData, type DocumentSnapshot } from "firebase/firestore";
import { ParticipantSchema } from "./schemas";
import { type Participant, type ParticipantDoc } from "./types";

export function toParticipant(
  doc: DocumentSnapshot<ParticipantDoc, DocumentData>
): Participant {
  const data = doc.data();

  if (!data) {
    throw new Error("Participant not found");
  }

  return assertValid(ParticipantSchema, {
    id: doc.id,
    displayName: data.displayName,
    role: data.role,
    joinedAt: data.joinedAt.toDate(),
    sessionId: data.sessionId,
    uid: data.uid,
    deletedAt: data.deletedAt ? data.deletedAt.toDate() : null,
    leftAt: data.leftAt ? data.leftAt.toDate() : null,
    status: data.status,
  });
}
