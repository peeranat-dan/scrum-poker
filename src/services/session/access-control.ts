import { findCurrentUserParticipant } from '@/data/participant/find-current-user-participant';
import {
  assertIsSessionOwner,
  assertParticipantExists,
  canManageSession,
} from '@/domain/participant/rules';

export async function checkIfUserCanManageSession(sessionId: string) {
  const participant = await findCurrentUserParticipant(sessionId);

  assertParticipantExists(participant);

  return canManageSession(participant);
}

/**
 * Asserts that the current user is the owner of the session.
 *
 * @param sessionId The session id
 * @throws When the user is not authenticated or is not the session owner
 */
export async function assertUserIsSessionOwner(sessionId: string) {
  const participant = await findCurrentUserParticipant(sessionId);

  assertIsSessionOwner(participant);
}
