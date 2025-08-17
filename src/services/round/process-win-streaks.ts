import { updateParticipant } from '@/data/participant/update-participant';
import { type Participant } from '@/domain/participant/types';
import { type Vote } from '@/domain/vote/types';

export interface ProcessWinStreaksParams {
  participants: Participant[];
  votes: Vote[];
  originalEstimate: number;
}

/**
 * Processes win streaks for participants based on their votes and the original estimate.
 * Increments streak for correct votes, resets streak for incorrect votes.
 */
export async function processWinStreaks({
  participants,
  votes,
  originalEstimate,
}: ProcessWinStreaksParams): Promise<void> {
  const updatePromises = participants.map(async (participant) => {
    const participantVote = votes.find((vote) => vote.participantId === participant.id);
    
    if (!participantVote) {
      // No vote found for this participant, don't change their streak
      return;
    }

    let newWinStreak: number;
    
    if (participantVote.value === originalEstimate) {
      // Correct vote - increment win streak
      newWinStreak = (participant.winStreak || 0) + 1;
    } else {
      // Incorrect vote - reset win streak
      newWinStreak = 0;
    }

    // Only update if the streak has changed
    if (newWinStreak !== participant.winStreak) {
      await updateParticipant(participant.id, {
        winStreak: newWinStreak,
      });
    }
  });

  await Promise.all(updatePromises);
}