import { doc, updateDoc } from "firebase/firestore";
import { getParticipantById } from "./get-participant-by-id";
import { participantsCollection } from "../firestore";
import { getSession } from "../session/get-session";

export async function leaveSession(participantId: string) {
  const participant = await getParticipantById(participantId);

  if (!participant) {
    throw new Error("Participant not found");
  }

  const { sessionId } = participant;

  if (!sessionId) {
    throw new Error("Session ID not found");
  }

  const session = await getSession(sessionId);

  if (!session) {
    throw new Error("Session not found");
  }

  if (session.status === "finished") {
    throw new Error("Session is finished");
  }

  return await updateDoc(doc(participantsCollection, participantId), {
    leftAt: new Date(),
    status: "left",
  });
}
