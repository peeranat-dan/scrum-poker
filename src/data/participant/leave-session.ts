import { doc, updateDoc } from "firebase/firestore";
import { getParticipantById } from "./get-participant-by-id";
import { participantsCollection } from "../firestore";

export async function leaveSession(participantId: string) {
  const participant = await getParticipantById(participantId);

  if (!participant) {
    throw new Error("Participant not found");
  }

  const { sessionId } = participant;

  if (!sessionId) {
    throw new Error("Session ID not found");
  }

  return await updateDoc(doc(participantsCollection, participantId), {
    leavedAt: new Date(),
  });
}
