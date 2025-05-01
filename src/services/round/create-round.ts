import { addRound } from "@/data/round/add-round";
import { checkIfUserCanManageSession } from "../session/access-control";

export async function createRound(sessionId: string) {
  await checkIfUserCanManageSession(sessionId);

  const round = await addRound({
    sessionId,
    status: "in-progress",
    averageVote: null,
  });

  return round;
}
