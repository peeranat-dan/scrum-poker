import { auth } from '../auth';
import { findParticipant } from './find-participant';

/**
 * Finds the current user's participant in the session.
 *
 * @param sessionId The session id
 * @returns The participant, or null when the user has not joined the session
 * @throws When the user is not authenticated
 */
export async function findCurrentUserParticipant(sessionId: string) {
  const user = auth.currentUser;
  if (!user) throw new Error('User not authenticated');

  return findParticipant({
    filter: {
      sessionId,
      uid: user.uid,
    },
  });
}
