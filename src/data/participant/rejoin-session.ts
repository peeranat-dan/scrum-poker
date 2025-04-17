import { type RejoinSessionInput } from "@/types/participant.types";
import { doc, updateDoc } from "firebase/firestore";
import { participantsCollection } from "../firestore";
import { getSessionById } from "../session/get-session-by-id";
import { getParticipantById } from "./get-participant-by-id";

export async function rejoinSession(input: RejoinSessionInput) {
  const { sessionId, participantId } = input;

  const session = await getSessionById(sessionId);

  if (!session) {
    throw new Error("Session not found");
  }

  if (session.status !== "active") {
    throw new Error("Session is not active");
  }

  const participant = await getParticipantById(participantId);

  if (!participant) {
    throw new Error("Participant not found");
  }

  if (!participant.leftAt) {
    throw new Error("Participant has not left the session");
  }

  await updateDoc(doc(participantsCollection, participantId), {
    leftAt: null,
  });
}
