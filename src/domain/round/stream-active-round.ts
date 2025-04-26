import { streamActiveRound as streamActiveRoundData } from "@/data/round/stream-active-round";
import { type Round } from "./types";

export function streamActiveRound(
  sessionId: string,
  callback: (round: Round | undefined) => void
) {
  return streamActiveRoundData(sessionId, callback);
}
