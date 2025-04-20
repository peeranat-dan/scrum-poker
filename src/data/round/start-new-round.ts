import { createRound } from "./create-round";
import { getActiveRound } from "./get-active-round";
import { updateRound } from "./update-round";

export async function startNewRound(sessionId: string) {
  const activeRound = await getActiveRound(sessionId);

  if (!activeRound) {
    throw new Error("No active round");
  }

  await updateRound({
    id: activeRound.id,
    status: "finished",
    finishedAt: new Date(),
  });

  const nextRound = createRound(sessionId);

  return nextRound;
}
