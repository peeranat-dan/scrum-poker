import { type Vote, type VoteDoc } from "@/types/vote.types";
import { type DocumentData, type DocumentSnapshot } from "firebase/firestore";

export function voteConverter(
  doc: DocumentSnapshot<VoteDoc, DocumentData>
): Vote {
  const data = doc.data();

  if (!data) {
    throw new Error("Vote not found");
  }

  return {
    id: doc.id,
    castAt: data.castAt.toDate(),
    roundId: data.roundId,
    participantId: data.participantId,
    value: data.value,
  };
}
