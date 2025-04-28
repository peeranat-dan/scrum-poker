import { addDoc, doc, getDoc, serverTimestamp } from "firebase/firestore";

import { votesCollection } from "../firestore";
import { voteMapper } from "./mapper";
import { type AddVoteInput } from "./types";

export async function addVote(input: AddVoteInput) {
  const vote = await addDoc(votesCollection, {
    ...input,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  const voteDoc = await getDoc(doc(votesCollection, vote.id));

  return voteMapper.toVote(voteDoc);
}
