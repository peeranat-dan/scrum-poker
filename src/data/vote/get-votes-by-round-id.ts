import { getDocs, query, where } from "firebase/firestore";
import { votesCollection } from "../firestore";
import { toVote } from "./mapper";

export async function getVotesByRoundId(roundId: string) {
  const voteSnapshot = await getDocs(
    query(votesCollection, where("roundId", "==", roundId))
  );

  if (voteSnapshot.empty) {
    return [];
  }
  return voteSnapshot.docs.map((doc) => toVote(doc));
}
