import Big from "big.js";
import { getVotesByRoundId } from "../vote/get-votes-by-round-id";
import { updateRound } from "./update-round";

export async function revealRound(roundId: string) {
  const votes = await getVotesByRoundId(roundId);

  // Filter out votes that have value of 0, -1 and -2
  const filteredVotes = votes.filter(
    (vote) => vote.value !== -1 && vote.value !== -2 && vote.value !== 0
  );

  const averageVote = filteredVotes.length
    ? parseFloat(
        filteredVotes
          .reduce((acc, vote) => acc.plus(vote.value), new Big(0))
          .div(filteredVotes.length)
          .toFixed(2)
      )
    : 0;

  await updateRound({
    id: roundId,
    averageVote,
    status: "revealed",
    revealedAt: new Date(),
    finishedAt: null,
  });
}
