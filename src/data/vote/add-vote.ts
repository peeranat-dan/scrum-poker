import { addDoc, serverTimestamp } from "firebase/firestore";

import { votesCollection } from "../firestore";
import { type AddVoteInput } from "./types";

export async function addVote(input: AddVoteInput) {
  const vote = await addDoc(votesCollection, {
    ...input,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return vote;
}
