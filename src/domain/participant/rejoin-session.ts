import { getParticipant } from "@/data/participant/get-participant";
import { updateParticipant } from "@/data/participant/update-participant";
import { getSession } from "@/data/session/get-session";

export async function rejoinSession(participantId: string) {
  const participant = await getParticipant(participantId);

  if (!participant) {
    throw new Error("Participant not found");
  }

  if (participant.status !== "left") {
    throw new Error("Participant has not left the session");
  }

  const { sessionId } = participant;

  const session = await getSession(sessionId);

  if (!session) {
    throw new Error("Session not found");
  }

  if (session.status !== "active") {
    throw new Error("Session is not active");
  }

  await updateParticipant(participantId, {
    status: "active",
  });
}
