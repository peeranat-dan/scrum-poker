import { type UpdateVoteInput } from "@/types/vote.types";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { votesCollection } from "../firestore";

export async function updateVote(input: UpdateVoteInput) {
  const { voteId, value } = input;

  await updateDoc(doc(votesCollection, voteId), {
    value,
    castAt: serverTimestamp(),
  });
}
