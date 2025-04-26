import { addRound } from "@/data/round/add-round";
import { findRound } from "@/data/round/find-round";
import { updateRound } from "@/data/round/update-round";

export async function startNewRound(sessionId: string) {
  const latestRound = await findRound({
    filter: { sessionId },
    order: { field: "createdAt", direction: "desc" },
  });

  if (!latestRound) {
    throw new Error("No active round");
  }

  await updateRound(latestRound.id, {
    status: "finished",
  });

  const nextRound = await addRound({
    sessionId,
    status: "in-progress",
    averageVote: null,
  });

  return nextRound;
}
