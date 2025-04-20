import { type Participant } from "@/data/participant/types";
import { type Vote } from "@/types/vote.types";

export function mapParticipantsToVotes(
  participants: Participant[],
  votes: Vote[]
) {
  const votesByParticipantId = votes.reduce((acc, vote) => {
    acc[vote.participantId] = vote;
    return acc;
  }, {} as Record<string, Vote>);
  const sortedParticipantsByJoinedAt = participants.sort(
    (a, b) => a.joinedAt.getTime() - b.joinedAt.getTime()
  );
  const votesByParticipant = sortedParticipantsByJoinedAt.map((participant) => {
    const vote = votesByParticipantId[participant.id];
    return {
      ...participant,
      vote: vote ? vote.value : undefined, // Default to undefined if no vote exists
    };
  });

  return votesByParticipant;
}
