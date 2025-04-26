import { updateRound } from "@/data/round/update-round";
// import { calculateAverage } from "@/shared/utils/calculate-average";
// import { getVotesByRoundId } from "../vote/get-votes-by-round-id";

export async function revealRound(roundId: string) {
  //   const votes = await getVotesByRoundId(roundId);

  //   // Filter out invalid votes (0, -1, -2)
  //   const filteredVotes = votes.filter(
  //     (vote) => ![0, -1, -2].includes(vote.value)
  //   );

  //   const voteValues = filteredVotes.map((vote) => vote.value);

  //   const averageVote = calculateAverage(voteValues);

  await updateRound(roundId, {
    // TODO: calculate average
    averageVote: null,
    status: "revealed",
  });
}
