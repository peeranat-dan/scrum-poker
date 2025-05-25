import { type Participant } from '@/domain/participant/types';
import { type Vote } from '@/domain/vote/types';

export function mapParticipantsToVotes(participants: Participant[], votes: Vote[]) {
  const votesByParticipantId = votes.reduce(
    (acc, vote) => {
      acc[vote.participantId] = vote;
      return acc;
    },
    {} as Record<string, Vote>,
  );
  const votesByParticipant = participants.map((participant) => {
    const vote = votesByParticipantId[participant.id];
    return {
      ...participant,
      vote: vote ? vote.value : undefined, // Default to undefined if no vote exists
    };
  });

  return votesByParticipant;
}
