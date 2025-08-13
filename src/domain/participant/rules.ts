import { type Session } from '../session/types';
import { type Participant } from './types';

export function assertParticipantExists(
  participant: Participant | null | undefined,
): asserts participant is Participant {
  if (!participant) {
    throw new Error('Participant not found');
  }
}

export function canManageSession(participant: Participant) {
  return participant.role === 'owner' || participant.role === 'admin';
}

export function canRejoinSession(participant: Participant | null, session: Session | null) {
  assertParticipantExists(participant);
  if (participant.status !== 'left') {
    throw new Error('Participant has not left the session');
  }
  if (!session) {
    throw new Error('Session not found');
  }
  if (session.status !== 'active') {
    throw new Error('Session is not active');
  }
  return true;
}

export function canLeaveSession(participant: Participant | null, session: Session | null) {
  assertParticipantExists(participant);
  if (participant.status !== 'active') {
    throw new Error('Participant is not active, cannot leave the session');
  }
  if (!session) {
    throw new Error('Session not found');
  }
  if (session.status === 'finished') {
    throw new Error('Session is finished');
  }
  return true;
}

export function canBeRemoved(participant: Participant | null): asserts participant is Participant {
  assertParticipantExists(participant);

  if (participant.status !== 'active') {
    throw new Error('Participant is not active, cannot be removed');
  }
}

export function canVote(participant: Participant | undefined | null) {
  assertParticipantExists(participant);
  return participant.role !== 'spectator' && participant.status === 'active';
}

export function isSpectator(participant: Participant | null) {
  assertParticipantExists(participant);
  return participant.role === 'spectator';
}
