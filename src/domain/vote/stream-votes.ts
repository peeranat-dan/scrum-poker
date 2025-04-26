import { streamVotes as streamVotesData } from "@/data/vote/stream-votes";
import { type Vote } from "./types";

export function streamVotes(
  roundId: string,
  callback: (votes: Vote[]) => void
) {
  return streamVotesData(roundId, callback);
}
