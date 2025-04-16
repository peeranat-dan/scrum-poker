import { doc, getDoc } from "firebase/firestore";
import { participantsCollection } from "../firestore";
import { participantConverter } from "./firestore-converter";

export async function getParticipantById(participantId: string) {
  const participantDoc = await getDoc(
    doc(participantsCollection, participantId)
  );

  return participantConverter(participantDoc);
}
