import { getParticipant } from "@/data/participant/get-participant";
import { updateParticipant } from "@/data/participant/update-participant";
import { getSession } from "@/data/session/get-session";

export async function leaveSession(participantId: string) {
  const participant = await getParticipant(participantId);

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

  return await updateParticipant(participantId, {
    status: "left",
  });
}
