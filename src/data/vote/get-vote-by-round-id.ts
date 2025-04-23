import { getDocs, limit, query, where } from "firebase/firestore";
import { votesCollection } from "../firestore";
import { toVote } from "./mapper";

export async function getVoteByRoundId(roundId: string, participantId: string) {
  const voteSnapshot = await getDocs(
    query(
      votesCollection,
      where("roundId", "==", roundId),
      where("participantId", "==", participantId),
      limit(1)
    )
  );

  if (voteSnapshot.empty) {
    return null;
  }

  return toVote(voteSnapshot.docs[0]);
}
