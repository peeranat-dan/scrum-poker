import { updateRound } from '@/data/round/update-round';
import { searchVotes } from '@/data/vote/search-votes';
import { calculateAverage } from '@/lib/math';

export async function revealRound(roundId: string) {
  const votes = await searchVotes({
    filter: {
      roundId,
    },
  });

  // Filter out invalid votes (0, -1, -2)
  const filteredVotes = votes.filter((vote) => ![0, -1, -2].includes(vote.value));

  const voteValues = filteredVotes.map((vote) => vote.value);

  const averageVote = calculateAverage(voteValues);

  await updateRound(roundId, {
    averageVote,
    status: 'revealed',
  });
}
