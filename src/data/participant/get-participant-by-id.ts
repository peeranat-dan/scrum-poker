import { doc, getDoc } from "firebase/firestore";
import { participantsCollection } from "../firestore";
import { toParticipant } from "./mapper";

export async function getParticipantById(participantId: string) {
  const participantDoc = await getDoc(
    doc(participantsCollection, participantId)
  );

  return toParticipant(participantDoc);
}
