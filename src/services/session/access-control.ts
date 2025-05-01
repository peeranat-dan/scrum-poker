import { auth } from "@/data/auth";
import { findParticipant } from "@/data/participant/find-participant";
import {
  assertParticipantExists,
  canManageSession,
} from "@/domain/participant/rules";

export async function checkIfUserCanManageSession(sessionId: string) {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const participant = await findParticipant({
    filter: {
      sessionId,
      uid: user.uid,
    },
  });

  assertParticipantExists(participant);

  return canManageSession(participant);
}
