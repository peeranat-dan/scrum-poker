import { auth } from "@/data/auth";
import { findParticipants } from "@/data/participant/find-participants";
import { canManageSession } from "@/domain/participant/rules";

export async function checkIfUserCanManageSession(sessionId: string) {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const participant = await findParticipants({
    sessionId,
    uid: user.uid,
  });
  if (!participant || participant.length === 0) {
    throw new Error("Participant not found");
  }
  return canManageSession(participant[0]);
}
