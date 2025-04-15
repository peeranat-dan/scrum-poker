import { type UpdateVoteInput } from "@/types/vote.types";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { votesCollection } from "../firestore";
import { getVoteById } from "./get-vote-by-id";
import { getRoundById } from "../round/get-round-by-id";

export async function updateVote(input: UpdateVoteInput) {
  const { voteId, value } = input;

  const vote = await getVoteById(voteId);

  const round = await getRoundById(vote.roundId);

  if (round.status !== "in-progress") {
    throw new Error("Round is not in progress");
  }

  await updateDoc(doc(votesCollection, voteId), {
    value,
    castAt: serverTimestamp(),
  });
}
