import { assertValid } from "@/shared/zod/utils";
import { addDoc, serverTimestamp } from "firebase/firestore";
import { votesCollection } from "../firestore";
import { getRoundById } from "../round/get-round-by-id";
import { CastVoteSchema } from "./schemas";
import { type CastVoteInput } from "./types";

export async function castVote(input: CastVoteInput) {
  const { participantId, roundId, value } = assertValid(CastVoteSchema, input);

  const round = await getRoundById(roundId);

  if (round.status !== "in-progress") {
    throw new Error("Round is not in progress");
  }

  const vote = await addDoc(votesCollection, {
    castAt: serverTimestamp(),
    participantId,
    roundId,
    value,
  });

  return vote;
}
