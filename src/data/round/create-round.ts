import { addDoc } from "firebase/firestore";
import { roundsCollection } from "../firestore";
import { getActiveRound } from "./get-active-round";

export async function createRound(sessionId: string) {
  const activeRound = await getActiveRound(sessionId);

  if (activeRound) {
    return activeRound;
  }

  const round = await addDoc(roundsCollection, {
    sessionId,
    status: "in-progress",
    revealedAt: null,
  });
  return round;
}
