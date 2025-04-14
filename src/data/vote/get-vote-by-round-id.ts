import { getDocs, limit, query, where } from "firebase/firestore";
import { votesCollection } from "../firestore";
import { voteConverter } from "./firestore-converter";

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

  return voteConverter(voteSnapshot.docs[0]);
}
