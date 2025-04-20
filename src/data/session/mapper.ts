import { type Session, type SessionDoc } from "@/types/session.types";
import { type DocumentData, type DocumentSnapshot } from "firebase/firestore";
import { SessionSchema } from "./schemas";

export function toSession(
  doc: DocumentSnapshot<SessionDoc, DocumentData>
): Session {
  const data = doc.data();

  if (!data) {
    throw new Error("Session not found");
  }

  return SessionSchema.parse({
    id: doc.id,
    createdAt: data.createdAt.toDate(),
    name: data.name,
    votingSystem: data.votingSystem,
    status: data.status,
    ownerId: data.ownerId,
  });
}
