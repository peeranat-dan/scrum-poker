import { describe, expect, it } from 'vitest';

import { type Session } from '../../session/types';
import {
  assertParticipantExists,
  canBeRemoved,
  canLeaveSession,
  canManageSession,
  canRejoinSession,
  canVote,
  isSpectator,
} from '../rules';
import { type Participant } from '../types';

describe('participant rules', () => {
  describe('assertParticipantExists', () => {
    it('throws error when participant is null', () => {
      expect(() => assertParticipantExists(null)).toThrowError(new Error('Participant not found'));
    });

    it('does not throw when participant exists', () => {
      const participant = { id: '1', role: 'player' } as Participant;
      expect(() => assertParticipantExists(participant)).not.toThrowError();
    });
  });

  describe('canManageSession', () => {
    it('returns true for owner role', () => {
      const participant = { role: 'owner' } as Participant;
      expect(canManageSession(participant)).toBe(true);
    });

    it('returns true for admin role', () => {
      const participant = { role: 'admin' } as Participant;
      expect(canManageSession(participant)).toBe(true);
    });

    it('returns false for player role', () => {
      const participant = { role: 'player' } as Participant;
      expect(canManageSession(participant)).toBe(false);
    });

    it('returns false for spectator role', () => {
      const participant = { role: 'spectator' } as Participant;
      expect(canManageSession(participant)).toBe(false);
    });
  });

  describe('canRejoinSession', () => {
    const validSession = { status: 'active' } as Session;
    const leftParticipant = { status: 'left' } as Participant;

    it('throws when participant has not left', () => {
      const activeParticipant = { status: 'active' } as Participant;
      expect(() => canRejoinSession(activeParticipant, validSession)).toThrowError(
        new Error('Participant has not left the session'),
      );
    });

    it('throws when session is null', () => {
      expect(() => canRejoinSession(leftParticipant, null)).toThrowError(
        new Error('Session not found'),
      );
    });

    it('throws when session is not active', () => {
      const inactiveSession = { status: 'finished' } as Session;
      expect(() => canRejoinSession(leftParticipant, inactiveSession)).toThrowError(
        new Error('Session is not active'),
      );
    });

    it('returns true for valid rejoin scenario', () => {
      expect(canRejoinSession(leftParticipant, validSession)).toBe(true);
    });
  });

  describe('canLeaveSession', () => {
    const activeSession = { status: 'active' } as Session;
    const activeParticipant = { status: 'active' } as Participant;

    it('throws when participant is not active', () => {
      const inactiveParticipant = { status: 'left' } as Participant;
      expect(() => canLeaveSession(inactiveParticipant, activeSession)).toThrowError(
        new Error('Participant is not active, cannot leave the session'),
      );
    });

    it('throws when session is null', () => {
      expect(() => canLeaveSession(activeParticipant, null)).toThrowError(
        new Error('Session not found'),
      );
    });

    it('throws when session is finished', () => {
      const finishedSession = { status: 'finished' } as Session;
      expect(() => canLeaveSession(activeParticipant, finishedSession)).toThrowError(
        new Error('Session is finished'),
      );
    });

    it('returns true for valid leave scenario', () => {
      expect(canLeaveSession(activeParticipant, activeSession)).toBe(true);
    });
  });

  describe('canBeRemoved', () => {
    it('throws when participant is not active', () => {
      const inactiveParticipant = { status: 'left' } as Participant;
      expect(() => canBeRemoved(inactiveParticipant)).toThrowError(
        new Error('Participant is not active, cannot be removed'),
      );
    });

    it('returns true for active participant', () => {
      const activeParticipant = { status: 'active' } as Participant;
      expect(() => canBeRemoved(activeParticipant)).not.toThrowError();
    });
  });

  describe('canVote', () => {
    it('returns true for active player', () => {
      const participant = { role: 'player', status: 'active' } as Participant;
      expect(canVote(participant)).toBe(true);
    });

    it('returns true for active owner', () => {
      const participant = { role: 'owner', status: 'active' } as Participant;
      expect(canVote(participant)).toBe(true);
    });

    it('returns true for active admin', () => {
      const participant = { role: 'admin', status: 'active' } as Participant;
      expect(canVote(participant)).toBe(true);
    });

    it('returns false for spectator regardless of status', () => {
      const activeSpectator = { role: 'spectator', status: 'active' } as Participant;
      expect(canVote(activeSpectator)).toBe(false);
    });

    it('returns false for inactive player', () => {
      const inactivePlayer = { role: 'player', status: 'left' } as Participant;
      expect(canVote(inactivePlayer)).toBe(false);
    });

    it('throws when participant is null', () => {
      expect(() => canVote(null)).toThrowError(new Error('Participant not found'));
    });
  });

  describe('isSpectator', () => {
    it('returns true for spectator role', () => {
      const participant = { role: 'spectator' } as Participant;
      expect(isSpectator(participant)).toBe(true);
    });

    it('returns false for player role', () => {
      const participant = { role: 'player' } as Participant;
      expect(isSpectator(participant)).toBe(false);
    });

    it('returns false for owner role', () => {
      const participant = { role: 'owner' } as Participant;
      expect(isSpectator(participant)).toBe(false);
    });

    it('returns false for admin role', () => {
      const participant = { role: 'admin' } as Participant;
      expect(isSpectator(participant)).toBe(false);
    });

    it('throws when participant is null', () => {
      expect(() => isSpectator(null)).toThrowError(new Error('Participant not found'));
    });
  });
});
