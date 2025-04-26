import { findRound } from "@/data/round/find-round";

export async function getActiveRound(sessionId: string) {
  const round = await findRound({
    filter: { sessionId: sessionId, status: "in-progress" },
  });

  return round;
}
