import { type CastVoteInput } from "@/types/vote.types";
import { addDoc, Timestamp } from "firebase/firestore";
import { votesCollection } from "../firestore";
import { getRoundById } from "../round/get-round-by-id";

export async function castVote(input: CastVoteInput) {
  const { participantId, roundId, value } = input;

  const round = await getRoundById(roundId);

  if (round.status !== "in-progress") {
    throw new Error("Round is not in progress");
  }

  const vote = await addDoc(votesCollection, {
    castAt: Timestamp.now(),
    participantId,
    roundId,
    value,
  });

  return vote;
}
