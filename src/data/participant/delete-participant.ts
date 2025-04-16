import { doc, updateDoc } from "firebase/firestore";
import { participantsCollection } from "../firestore";

export async function deleteParticipant(participantId: string) {
  return await updateDoc(doc(participantsCollection, participantId), {
    deletedAt: new Date(),
  });
}
