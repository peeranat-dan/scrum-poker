import { assertValid } from "@/shared/zod/utils";
import { type DocumentData, type DocumentSnapshot } from "firebase/firestore";
import { RoundSchema } from "./schemas";
import { type Round, type RoundDoc } from "./types";

export function toRound(doc: DocumentSnapshot<RoundDoc, DocumentData>): Round {
  const data = doc.data();

  if (!data) {
    throw new Error("Round not found");
  }

  return assertValid(RoundSchema, {
    id: doc.id,
    sessionId: data.sessionId,
    status: data.status,
    revealedAt: data.revealedAt?.toDate() ?? null,
    averageVote: data.averageVote,
    finishedAt: data.finishedAt?.toDate() ?? null,
    createdAt: data.createdAt.toDate(),
  });
}
