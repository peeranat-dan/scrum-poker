import { limit, onSnapshot, query, where } from "firebase/firestore";

import { participantsCollection } from "../firestore";
import { toParticipant } from "./mapper";
import { type Participant } from "./types";

export function streamParticipant(
  sessionId: string,
  uid: string,
  callback: (participant: Participant | undefined) => void,
  errorCallback: (error: Error) => void
) {
  const q = query(
    participantsCollection,
    where("sessionId", "==", sessionId),
    where("uid", "==", uid),
    limit(1)
  );

  const unsubscribe = onSnapshot(
    q,
    (querySnapshot) => {
      const participant = querySnapshot.docs.length
        ? toParticipant(querySnapshot.docs[0])
        : undefined;
      callback(participant);
    },
    (error) => {
      errorCallback(error);
    }
  );

  return unsubscribe;
}
