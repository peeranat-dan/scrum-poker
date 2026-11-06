/** Longest issue id accepted, long enough for a pasted tracker link */
export const MAX_ISSUE_ID_LENGTH = 200;

const URL_PATTERN = /^https?:\/\//i;

/**
 * Normalizes an issue id typed by the user. Surrounding whitespace is removed and
 * an empty value clears the issue id.
 *
 * @param value The raw issue id, e.g. ` PROJ-123 `
 * @returns The trimmed issue id, or `null` when it is empty
 * @throws When the issue id is longer than {@link MAX_ISSUE_ID_LENGTH}
 */
export function normalizeIssueId(value: string | null | undefined) {
  const issueId = value?.trim() ?? '';

  if (issueId.length > MAX_ISSUE_ID_LENGTH) {
    throw new Error(`Issue ID must be at most ${MAX_ISSUE_ID_LENGTH} characters`);
  }

  // NOTE: `||` instead of `??` so an empty string also clears the issue id
  return issueId || null;
}

/**
 * Builds the link to an issue in the issue tracker.
 * - A pasted link (`https://...`) is used as is.
 * - Otherwise the issue id is appended to the tracker base url, e.g.
 *   `https://example.atlassian.net/browse/` + `PROJ-123`.
 *
 * @param issueId The issue id
 * @param issueTrackerUrl The issue tracker base url configured on the session
 * @returns The issue link, or `null` when no link can be built
 */
export function toIssueUrl(issueId: string | null, issueTrackerUrl: string | null) {
  if (!issueId) {
    return null;
  }

  if (URL_PATTERN.test(issueId)) {
    return issueId;
  }

  // NOTE: Re-check the protocol so a hand-edited tracker url can never become a `javascript:` link
  if (!issueTrackerUrl || !URL_PATTERN.test(issueTrackerUrl)) {
    return null;
  }

  return `${issueTrackerUrl}${encodeURIComponent(issueId)}`;
}

/**
 * Builds a short label for an issue id. Pasted links are shortened to their last
 * path segment (`https://github.com/org/repo/issues/42` -> `42`).
 *
 * @param issueId The issue id
 */
export function toIssueLabel(issueId: string) {
  if (!URL_PATTERN.test(issueId)) {
    return issueId;
  }

  try {
    const { hostname, pathname } = new URL(issueId);
    const lastSegment = pathname.split('/').filter(Boolean).pop();
    return lastSegment ? decodeURIComponent(lastSegment) : hostname;
  } catch {
    return issueId;
  }
}

/**
 * Normalizes the issue tracker base url configured on a session. An empty value
 * turns auto-linking off.
 *
 * @param value The raw base url, e.g. `https://example.atlassian.net/browse/`
 * @returns The trimmed base url, or `null` when it is empty
 * @throws When the value is not an `http(s)` url
 */
export function normalizeIssueTrackerUrl(value: string | null | undefined) {
  const url = value?.trim() ?? '';

  if (!url) {
    return null;
  }

  if (!URL_PATTERN.test(url) || !URL.canParse(url)) {
    throw new Error('Issue tracker URL must start with http:// or https://');
  }

  return url;
}
