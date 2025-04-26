import { findParticipants } from "@/data/participant/find-participants";

export async function getParticipantBySessionIdAndUserId(
  sessionId: string,
  uid: string
) {
  const participant = await findParticipants({ sessionId, uid });

  if (!participant || !participant.length) {
    return null;
  }

  // We are assuming that there is only one participant with the same sessionId and userId
  return participant[0];
}
