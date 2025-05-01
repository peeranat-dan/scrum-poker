import { getParticipant } from "@/data/participant/get-participant";
import { updateParticipant } from "@/data/participant/update-participant";
import { getSession } from "@/data/session/get-session";
import { canRejoinSession } from "@/domain/participant/rules";

/**
 * Rejoin a session
 *
 * @param participantId The participant ID
 */
export async function rejoinSession(participantId: string) {
  const participant = await getParticipant(participantId);

  const session = participant?.sessionId
    ? await getSession(participant.sessionId)
    : null;

  canRejoinSession(participant, session);

  await updateParticipant(participantId, { status: "active" });
}
