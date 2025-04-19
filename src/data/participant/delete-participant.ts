import { doc, updateDoc } from "firebase/firestore";
import { participantsCollection } from "../firestore";
import { getParticipantById } from "./get-participant-by-id";

export async function deleteParticipant(participantId: string) {
  const participant = await getParticipantById(participantId);

  if (!participant) {
    throw new Error("Participant not found");
  }

  if (participant.status === "deleted") {
    throw new Error("Participant already deleted");
  }

  return await updateDoc(doc(participantsCollection, participantId), {
    deletedAt: new Date(),
    status: "deleted",
  });
}
