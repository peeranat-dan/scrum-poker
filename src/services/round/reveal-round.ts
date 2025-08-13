import { searchParticipants } from '@/data/participant/search-participants';
import { updateRound } from '@/data/round/update-round';
import { searchVotes } from '@/data/vote/search-votes';
import { calculateAverage } from '@/lib/math';

export async function revealRound(roundId: string) {
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
        op: '!=',
        value: 'spectator',
      },
    },
  });

  const validVotes = votes.filter((vote) =>
    participants.some((participant) => participant.id === vote.participantId),
  );

  const voteValues = validVotes.map((vote) => vote.value);

  const averageVote = calculateAverage(voteValues);

  await updateRound(roundId, {
    averageVote,
    status: 'revealed',
  });
}
