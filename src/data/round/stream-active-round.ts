import { type Round } from "@/types/round.types";
import { and, limit, onSnapshot, or, query, where } from "firebase/firestore";
import { roundsCollection } from "../firestore";
import { roundConverter } from "./firestore-converter";

export function streamActiveRound(
  sessionId: string,
  callback: (round: Round | undefined) => void
) {
  const q = query(
    roundsCollection,
    and(
      where("sessionId", "==", sessionId),
      or(
        where("status", "==", "in-progress"),
        where("status", "==", "revealed")
      )
    ),
    limit(1)
  );

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const round = querySnapshot.docs.length
      ? roundConverter(querySnapshot.docs[0])
      : undefined;
    callback(round);
  });

  return unsubscribe;
}
