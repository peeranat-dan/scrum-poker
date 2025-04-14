import { getDocs, query, where } from "firebase/firestore";
import { participantsCollection } from "../firestore";
import { participantConverter } from "./firestore-converter";

export async function getParticipantsBySessionId(sessionId: string) {
  const participantSnapshot = await getDocs(
    query(participantsCollection, where("sessionId", "==", sessionId))
  );

  if (participantSnapshot.empty) {
    return [];
  }

  return participantSnapshot.docs.map((participantDoc) =>
    participantConverter(participantDoc)
  );
}
