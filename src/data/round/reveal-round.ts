import { getVotesByRoundId } from "../vote/get-votes-by-round-id";
import { updateRound } from "./update-round";

export async function revealRound(roundId: string) {
  const votes = await getVotesByRoundId(roundId);

  // Filter out votes that have value of -1 and -2
  const filteredVotes = votes.filter(
    (vote) => vote.value !== -1 && vote.value !== -2
  );

  const averageVote = filteredVotes.length
    ? filteredVotes.reduce((acc, vote) => acc + vote.value, 0) /
      filteredVotes.length
    : null;

  await updateRound({
    id: roundId,
    averageVote,
    status: "revealed",
    revealedAt: new Date(),
    finishedAt: null,
  });
}
