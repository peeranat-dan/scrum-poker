import { doc, getDoc } from "firebase/firestore";
import { votesCollection } from "../firestore";
import { voteConverter } from "./firestore-converter";

export async function getVoteById(id: string) {
  const voteDoc = await getDoc(doc(votesCollection, id));

  if (!voteDoc.exists()) {
    throw new Error("Vote not found");
  }

  return voteConverter(voteDoc);
}
