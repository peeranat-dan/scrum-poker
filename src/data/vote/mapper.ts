import { assertValid } from "@/shared/zod/utils";
import { type DocumentData, type DocumentSnapshot } from "firebase/firestore";
import { VoteSchema } from "./schemas";
import { type Vote, type VoteDoc } from "./types";

export function toVote(doc: DocumentSnapshot<VoteDoc, DocumentData>): Vote {
  const data = doc.data();

  if (!data) {
    throw new Error("Vote not found");
  }

  return assertValid(VoteSchema, {
    id: doc.id,
    roundId: data.roundId,
    participantId: data.participantId,
    value: data.value,
    castAt: data.castAt.toDate(),
  });
}
