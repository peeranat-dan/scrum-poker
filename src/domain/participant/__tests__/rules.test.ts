import { describe, expect, it } from 'vitest';

import { type Session } from '../../session/types';
import {
  assertParticipantExists,
  canBeRemoved,
  canLeaveSession,
  canManageSession,
  canRejoinSession,
  canVote,
  filterSpectators,
  filterVotingParticipants,
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
    it('returns false when participant is null', () => {
      expect(canVote(null)).toBe(false);
    });

    it('returns false for spectator role', () => {
      const spectator = { role: 'spectator', status: 'active' } as Participant;
      expect(canVote(spectator)).toBe(false);
    });

    it('returns false for inactive participant', () => {
      const inactivePlayer = { role: 'player', status: 'left' } as Participant;
      expect(canVote(inactivePlayer)).toBe(false);
    });

    it('returns true for active player', () => {
      const activePlayer = { role: 'player', status: 'active' } as Participant;
      expect(canVote(activePlayer)).toBe(true);
    });

    it('returns true for active admin', () => {
      const activeAdmin = { role: 'admin', status: 'active' } as Participant;
      expect(canVote(activeAdmin)).toBe(true);
    });

    it('returns true for active owner', () => {
      const activeOwner = { role: 'owner', status: 'active' } as Participant;
      expect(canVote(activeOwner)).toBe(true);
    });
  });

  describe('isSpectator', () => {
    it('returns false when participant is null', () => {
      expect(isSpectator(null)).toBe(false);
    });

    it('returns true for spectator role', () => {
      const spectator = { role: 'spectator' } as Participant;
      expect(isSpectator(spectator)).toBe(true);
    });

    it('returns false for non-spectator roles', () => {
      const player = { role: 'player' } as Participant;
      const admin = { role: 'admin' } as Participant;
      const owner = { role: 'owner' } as Participant;
      
      expect(isSpectator(player)).toBe(false);
      expect(isSpectator(admin)).toBe(false);
      expect(isSpectator(owner)).toBe(false);
    });
  });

  describe('filterVotingParticipants', () => {
    it('filters out spectators from participant list', () => {
      const participants = [
        { id: '1', role: 'player' } as Participant,
        { id: '2', role: 'spectator' } as Participant,
        { id: '3', role: 'admin' } as Participant,
        { id: '4', role: 'spectator' } as Participant,
        { id: '5', role: 'owner' } as Participant,
      ];

      const result = filterVotingParticipants(participants);
      
      expect(result).toHaveLength(3);
      expect(result.map(p => p.id)).toEqual(['1', '3', '5']);
      expect(result.every(p => p.role !== 'spectator')).toBe(true);
    });

    it('returns empty array when all participants are spectators', () => {
      const participants = [
        { id: '1', role: 'spectator' } as Participant,
        { id: '2', role: 'spectator' } as Participant,
      ];

      const result = filterVotingParticipants(participants);
      
      expect(result).toHaveLength(0);
    });
  });

  describe('filterSpectators', () => {
    it('returns only spectators from participant list', () => {
      const participants = [
        { id: '1', role: 'player' } as Participant,
        { id: '2', role: 'spectator' } as Participant,
        { id: '3', role: 'admin' } as Participant,
        { id: '4', role: 'spectator' } as Participant,
        { id: '5', role: 'owner' } as Participant,
      ];

      const result = filterSpectators(participants);
      
      expect(result).toHaveLength(2);
      expect(result.map(p => p.id)).toEqual(['2', '4']);
      expect(result.every(p => p.role === 'spectator')).toBe(true);
    });

    it('returns empty array when no spectators present', () => {
      const participants = [
        { id: '1', role: 'player' } as Participant,
        { id: '2', role: 'admin' } as Participant,
      ];

      const result = filterSpectators(participants);
      
      expect(result).toHaveLength(0);
    });
  });
});
