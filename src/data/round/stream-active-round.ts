import { and, limit, onSnapshot, or, query, where } from "firebase/firestore";
import { roundsCollection } from "../firestore";
import { toRound } from "./mapper";
import { type Round } from "./types";

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
    console.log(querySnapshot.docs[0]?.data());
    const round = querySnapshot.docs.length
      ? toRound(querySnapshot.docs[0])
      : undefined;
    callback(round);
  });

  return unsubscribe;
}
