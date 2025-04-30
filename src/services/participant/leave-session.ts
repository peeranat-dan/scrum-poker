import { getParticipant } from "@/data/participant/get-participant";
import { updateParticipant } from "@/data/participant/update-participant";
import { getSession } from "@/data/session/get-session";
import { canLeaveSession } from "@/domain/participant/rules";

export async function leaveSession(participantId: string) {
  const participant = await getParticipant(participantId);

  const session = participant?.sessionId
    ? await getSession(participant.sessionId)
    : null;

  canLeaveSession(participant, session);

  return await updateParticipant(participantId, {
    status: "left",
  });
}
