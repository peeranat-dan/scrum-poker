import { updateParticipant } from '@/data/participant/update-participant';

/**
 * Updates a participant's win streak
 * @param participantId - The ID of the participant
 * @param newStreak - The new streak value
 */
export async function updateParticipantStreak(participantId: string, newStreak: number) {
  await updateParticipant(participantId, {
    winStreak: newStreak,
  });
}