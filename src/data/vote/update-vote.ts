import { assertValid } from "@/shared/zod/utils";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { votesCollection } from "../firestore";
import { getRoundById } from "../round/get-round-by-id";
import { getVoteById } from "./get-vote-by-id";
import { UpdateVoteSchema } from "./schemas";
import { type UpdateVoteInput } from "./types";

export async function updateVote(input: UpdateVoteInput) {
  const { id, value } = assertValid(UpdateVoteSchema, input);

  const vote = await getVoteById(id);

  const round = await getRoundById(vote.roundId);

  if (round.status !== "in-progress") {
    throw new Error("Round is not in progress");
  }

  await updateDoc(doc(votesCollection, id), {
    value,
    castAt: serverTimestamp(),
  });
}
