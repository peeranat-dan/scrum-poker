import { type Session, type SessionDoc } from "@/types/session.types";
import { type DocumentData, type DocumentSnapshot } from "firebase/firestore";

export function sessionConverter(
  doc: DocumentSnapshot<SessionDoc, DocumentData>
): Session {
  const data = doc.data();

  if (!data) {
    throw new Error("Session not found");
  }

  return {
    id: doc.id,
    createdAt: data.createdAt.toDate(),
    name: data.name,
    votingSystem: data.votingSystem,
    status: data.status,
  };
}
