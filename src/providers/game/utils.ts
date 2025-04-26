import { type Vote } from "@/data/vote/types";
import { type Participant } from "@/domain/participant/types";

export function mapParticipantsToVotes(
  participants: Participant[],
  votes: Vote[]
) {
  const votesByParticipantId = votes.reduce((acc, vote) => {
    acc[vote.participantId] = vote;
    return acc;
  }, {} as Record<string, Vote>);
  const sortedParticipantsByUpdatedAt = participants.sort(
    (a, b) => a.updatedAt.getTime() - b.updatedAt.getTime()
  );
  const votesByParticipant = sortedParticipantsByUpdatedAt.map(
    (participant) => {
      const vote = votesByParticipantId[participant.id];
      return {
        ...participant,
        vote: vote ? vote.value : undefined, // Default to undefined if no vote exists
      };
    }
  );

  return votesByParticipant;
}
