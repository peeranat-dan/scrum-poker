import { getParticipant } from "@/data/participant/get-participant";
import { updateParticipant } from "@/data/participant/update-participant";
import { canBeRemoved } from "@/domain/participant/rules";

import { checkIfUserCanManageSession } from "../session/access-control";

export async function removeParticipant(id: string) {
  const participant = await getParticipant(id);

  canBeRemoved(participant);

  await checkIfUserCanManageSession(participant.sessionId);

  await updateParticipant(id, {
    status: "removed",
  });
}
