import { describe, expect, it } from 'vitest';

import {
  assertSessionExists,
  assertSessionIsActive,
  shouldValidateVotingSystemChange,
} from '../rules';
import { type Session } from '../types';

describe('session rules', () => {
  describe('assertSessionExists', () => {
    it('throws error when session is null', () => {
      expect(() => assertSessionExists(null)).toThrowError(new Error('Session not found'));
    });

    it('does not throw when session exists', () => {
      const session = { status: 'active' } as Session;
      expect(() => assertSessionExists(session)).not.toThrowError();
    });
  });

  describe('assertSessionIsActive', () => {
    it('throws error when session is finished', () => {
      const finishedSession = { status: 'finished' } as Session;
      expect(() => assertSessionIsActive(finishedSession)).toThrowError(
        new Error('Session is finished'),
      );
    });

    it('does not throw when session is active', () => {
      const activeSession = { status: 'active' } as Session;
      expect(() => assertSessionIsActive(activeSession)).not.toThrowError();
    });
  });

  describe('shouldValidateVotingSystemChange', () => {
    it('returns true when voting system changes', () => {
      const session = { votingSystem: 'fibonacci' } as Session;
      expect(shouldValidateVotingSystemChange(session, 't-shirt')).toBe(true);
    });

    it('returns false when voting system does not change', () => {
      const session = { votingSystem: 'fibonacci' } as Session;
      expect(shouldValidateVotingSystemChange(session, 'fibonacci')).toBe(false);
    });
  });
});
