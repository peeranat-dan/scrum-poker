import { createRound } from "./create-round";
import { getLatestRound } from "./get-latest-round";
import { updateRound } from "./update-round";

export async function startNewRound(sessionId: string) {
  const latestRound = await getLatestRound(sessionId);

  if (!latestRound) {
    throw new Error("No active round");
  }

  await updateRound({
    id: latestRound.id,
    status: "finished",
    finishedAt: new Date(),
  });

  const nextRound = createRound(sessionId);

  return nextRound;
}
