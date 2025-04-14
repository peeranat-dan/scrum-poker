import { getDocs, limit, query, where } from "firebase/firestore";
import { roundsCollection } from "../firestore";
import { roundConverter } from "./firestore-converter";

export async function getActiveRound(sessionId: string) {
  const activeRoundSnapshot = await getDocs(
    query(
      roundsCollection,
      where("sessionId", "==", sessionId),
      where("status", "==", "in-progress"),
      limit(1)
    )
  );

  if (activeRoundSnapshot.empty) {
    return undefined;
  }

  return roundConverter(activeRoundSnapshot.docs[0]);
}
