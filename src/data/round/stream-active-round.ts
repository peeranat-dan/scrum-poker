import { type Round } from "@/types/round.types";
import { limit, onSnapshot, query, where } from "firebase/firestore";
import { roundsCollection } from "../firestore";
import { roundConverter } from "./firestore-converter";

export function streamActiveRound(
  sessionId: string,
  callback: (round: Round) => void
) {
  const q = query(
    roundsCollection,
    where("sessionId", "==", sessionId),
    where("status", "==", "in-progress"),
    limit(1)
  );

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const round = roundConverter(querySnapshot.docs[0]);
    callback(round);
  });

  return unsubscribe;
}
