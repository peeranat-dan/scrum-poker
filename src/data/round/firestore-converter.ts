import { type Round, type RoundDoc } from "@/types/round.types";
import { type DocumentData, type DocumentSnapshot } from "firebase/firestore";

export function roundConverter(
  doc: DocumentSnapshot<RoundDoc, DocumentData>
): Round {
  const data = doc.data();

  if (!data) {
    throw new Error("Round not found");
  }

  return {
    id: doc.id,
    sessionId: data.sessionId,
    status: data.status,
    revealedAt: data.revealedAt?.toDate() ?? null,
    averageVote: data.averageVote,
  };
}
