import { type Participant } from "@/types/participant.types";
import { limit, onSnapshot, query, where } from "firebase/firestore";

import { participantsCollection } from "../firestore";
import { participantConverter } from "./firestore-converter";

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
        ? participantConverter(querySnapshot.docs[0])
        : undefined;
      callback(participant);
    },
    (error) => {
      errorCallback(error);
    }
  );

  return unsubscribe;
}
