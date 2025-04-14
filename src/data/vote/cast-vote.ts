import { type CastVoteInput } from "@/types/vote.types";
import { addDoc, Timestamp } from "firebase/firestore";
import { votesCollection } from "../firestore";

export async function castVote(input: CastVoteInput) {
  const { participantId, roundId, value } = input;

  const vote = await addDoc(votesCollection, {
    castAt: Timestamp.now(),
    participantId,
    roundId,
    value,
  });

  return vote;
}
