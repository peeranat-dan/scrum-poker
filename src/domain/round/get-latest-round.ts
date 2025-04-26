import { findRound } from "@/data/round/find-round";

export async function getLatestRound(sessionId: string) {
  const round = await findRound({
    filter: { sessionId },
    order: { field: "createdAt", direction: "desc" },
  });

  return round;
}
