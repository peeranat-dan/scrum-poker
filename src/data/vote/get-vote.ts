import { doc, getDoc } from "firebase/firestore";

import { votesCollection } from "../firestore";
import { voteMapper } from "./mapper";

export async function getVote(id: string) {
  const voteDoc = await getDoc(doc(votesCollection, id));
  return voteMapper.toVote(voteDoc);
}
