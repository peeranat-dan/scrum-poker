import { describe, expect, it } from 'vitest';

import {
  MAX_ISSUE_ID_LENGTH,
  normalizeIssueId,
  normalizeIssueTrackerUrl,
  toIssueLabel,
  toIssueUrl,
} from '../issue';

describe('round issue', () => {
  describe('normalizeIssueId', () => {
    it('trims surrounding whitespace', () => {
      expect(normalizeIssueId('  PROJ-123 ')).toBe('PROJ-123');
    });

    it.each(['', '   ', null, undefined])('returns null for %j', (value) => {
      expect(normalizeIssueId(value)).toBeNull();
    });

    it('throws when the issue id is too long', () => {
      expect(() => normalizeIssueId('a'.repeat(MAX_ISSUE_ID_LENGTH + 1))).toThrowError(
        `Issue ID must be at most ${MAX_ISSUE_ID_LENGTH} characters`,
      );
    });
  });

  describe('toIssueUrl', () => {
    it('returns null without an issue id', () => {
      expect(toIssueUrl(null, 'https://example.atlassian.net/browse/')).toBeNull();
    });

    it('appends the issue id to the tracker url', () => {
      expect(toIssueUrl('PROJ-123', 'https://example.atlassian.net/browse/')).toBe(
        'https://example.atlassian.net/browse/PROJ-123',
      );
    });

    it('encodes the issue id', () => {
      expect(toIssueUrl('a b#1', 'https://t.test/')).toBe('https://t.test/a%20b%231');
    });

    it('returns null when no tracker url is configured', () => {
      expect(toIssueUrl('PROJ-123', null)).toBeNull();
    });

    it('ignores a tracker url that is not http(s)', () => {
      expect(toIssueUrl('PROJ-123', 'javascript:alert(1)//')).toBeNull();
    });

    it('uses a pasted link as is', () => {
      expect(toIssueUrl('https://github.com/o/r/issues/42', null)).toBe(
        'https://github.com/o/r/issues/42',
      );
    });
  });

  describe('toIssueLabel', () => {
    it('keeps plain issue ids', () => {
      expect(toIssueLabel('PROJ-123')).toBe('PROJ-123');
    });

    it('shortens a pasted link to its last path segment', () => {
      expect(toIssueLabel('https://example.atlassian.net/browse/PROJ-9/')).toBe('PROJ-9');
    });

    it('falls back to the hostname when the link has no path', () => {
      expect(toIssueLabel('https://linear.app')).toBe('linear.app');
    });
  });

  describe('normalizeIssueTrackerUrl', () => {
    it('trims the url', () => {
      expect(normalizeIssueTrackerUrl(' https://example.atlassian.net/browse/ ')).toBe(
        'https://example.atlassian.net/browse/',
      );
    });

    it.each(['', '  ', null, undefined])('returns null for %j', (value) => {
      expect(normalizeIssueTrackerUrl(value)).toBeNull();
    });

    it.each(['example.atlassian.net', 'ftp://acme.test', 'javascript:alert(1)'])(
      'throws for %s',
      (value) => {
        expect(() => normalizeIssueTrackerUrl(value)).toThrowError(
          'Issue tracker URL must start with http:// or https://',
        );
      },
    );
  });
});
