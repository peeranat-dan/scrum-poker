import { searchParticipants } from '@/data/participant/search-participants';
import { updateRound } from '@/data/round/update-round';
import { searchVotes } from '@/data/vote/search-votes';
import { calculateAverage } from '@/lib/math';
import { processWinStreaks } from '../participant/process-win-streaks';

/**
 * Reveals a round with the original estimate and processes win streaks
 * @param roundId - The ID of the round to reveal
 * @param originalEstimate - The original estimate set by the game owner
 */
export async function revealRoundWithStreaks(roundId: string, originalEstimate: number) {
  const votes = await searchVotes({
    filter: {
      roundId,
      value: {
        op: '>=',
        value: 0,
      },
    },
  });

  const participants = await searchParticipants({
    filter: {
      id: {
        op: 'in',
        value: votes.map((vote) => vote.participantId),
      },
      status: 'active',
      role: {
        op: 'in',
        value: ['admin', 'owner', 'player'],
      },
    },
  });

  const validVotes = votes.filter((vote) =>
    participants.some((participant) => participant.id === vote.participantId),
  );

  const voteValues = validVotes.map((vote) => vote.value);
  const averageVote = calculateAverage(voteValues);

  // Update round with average vote, status, and original estimate
  await updateRound(roundId, {
    averageVote,
    status: 'revealed',
    originalEstimate,
  });

  // Process win streaks for all participants
  await processWinStreaks(roundId, originalEstimate);
}