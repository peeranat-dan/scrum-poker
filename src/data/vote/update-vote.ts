import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { votesCollection } from "../firestore";
import { type UpdateVoteInput } from "./types";

export async function updateVote(id: string, input: UpdateVoteInput) {
  await updateDoc(doc(votesCollection, id), {
    ...input,
    updatedAt: serverTimestamp(),
  });
}
