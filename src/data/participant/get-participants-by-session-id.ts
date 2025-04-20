import { getDocs, query, where } from "firebase/firestore";
import { participantsCollection } from "../firestore";
import { toParticipant } from "./mapper";

export async function getParticipantsBySessionId(sessionId: string) {
  const participantSnapshot = await getDocs(
    query(participantsCollection, where("sessionId", "==", sessionId))
  );

  if (participantSnapshot.empty) {
    return [];
  }

  return participantSnapshot.docs.map((participantDoc) =>
    toParticipant(participantDoc)
  );
}
