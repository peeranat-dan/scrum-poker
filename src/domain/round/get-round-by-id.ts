import { getRound } from "@/data/round/get-round";

export async function getRoundById(id: string) {
  const round = await getRound(id);

  return round;
}
