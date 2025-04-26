import { addRound } from "@/data/round/add-round";

export async function createRound(sessionId: string) {
  const round = await addRound({
    sessionId,
    status: "in-progress",
    averageVote: null,
  });

  return round;
}
