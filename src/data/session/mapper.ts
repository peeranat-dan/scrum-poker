import { assertValid } from "@/shared/zod/utils";
import { type DocumentData, type DocumentSnapshot } from "firebase/firestore";
import { SessionSchema } from "./schemas";
import { type Session, type SessionDoc } from "./types";

export function toSession(
  doc: DocumentSnapshot<SessionDoc, DocumentData>
): Session {
  const data = doc.data();

  if (!data) {
    throw new Error("Session not found");
  }

  return assertValid(SessionSchema, {
    id: doc.id,
    createdAt: data.createdAt,
    name: data.name,
    votingSystem: data.votingSystem,
    status: data.status,
    ownerId: data.ownerId,
  });
}
