import { searchParticipants } from '@/data/participant/search-participants';
import { updateRound } from '@/data/round/update-round';
import { searchVotes } from '@/data/vote/search-votes';
import { calculateAverage } from '@/lib/math';
import { processWinStreaks } from './process-win-streaks';

export interface RevealRoundWithStreaksParams {
  roundId: string;
  originalEstimate: number;
}

/**
 * Reveals a round and processes win streaks based on the original estimate.
 */
export async function revealRoundWithStreaks({
  roundId,
  originalEstimate,
}: RevealRoundWithStreaksParams) {
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

  // Process win streaks before updating the round
  await processWinStreaks({
    participants,
    votes: validVotes,
    originalEstimate,
  });

  // Update the round with average vote, status, and original estimate
  await updateRound(roundId, {
    averageVote,
    status: 'revealed',
    originalEstimate,
  });
}