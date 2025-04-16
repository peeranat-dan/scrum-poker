import { type Participant } from "@/types/participant.types";
import { doc, onSnapshot } from "firebase/firestore";

import { participantConverter } from "./firestore-converter";
import { participantsCollection } from "../firestore";

export function streamParticipant(
  participantId: string,
  callback: (participant: Participant | undefined) => void
) {
  const unsubscribe = onSnapshot(
    doc(participantsCollection, participantId),
    (doc) => {
      callback(participantConverter(doc));
    }
  );

  return unsubscribe;
}
