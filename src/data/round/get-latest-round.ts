import { getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { roundsCollection } from "../firestore";
import { toRound } from "./mapper";

export async function getLatestRound(sessionId: string) {
  const activeRoundSnapshot = await getDocs(
    query(
      roundsCollection,
      where("sessionId", "==", sessionId),
      orderBy("createdAt", "desc"),
      limit(1)
    )
  );

  if (activeRoundSnapshot.empty) {
    return undefined;
  }

  return toRound(activeRoundSnapshot.docs[0]);
}
