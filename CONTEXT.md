# Domain Glossary

This document covers the core domain entities in this application and their relationships.

## Relationships

```
Session (1)
  ├─ has (1:M) ──→ Rounds
  │                 └─ has (1:M) ──→ Votes
  └─ has (1:M) ──→ Participants
                    └─ casts ──→ Votes (linked via roundId)
```

---

## Session

A planning session where participants vote on story estimates.

**Properties**: `name`, `votingSystem` (`fibonacci` | `t-shirt`), `status` (`active` | `finished`), `ownerId`

**Lifecycle**: `active` → `finished`

**Business Rules**:
- Only `owner` or `admin` participants can manage session settings.
- The `votingSystem` cannot be changed if votes already exist in the active round.

---

## Participant

A user who has joined a Session.

**Properties**: `sessionId`, `uid`, `displayName`, `role`, `status`

- **Role**: `owner` | `admin` | `player` | `spectator`
- **Status**: `active` | `left` | `removed`

**Lifecycle**: `active` → `left` or `removed`

**Business Rules**:
- A participant who has `left` or been `removed` is still part of the session's history.
- Only participants with `role !== 'spectator'` AND `status === 'active'` can vote.
- Only `active` participants can leave or be removed; the session must be `active`.
- A participant with status `left` may rejoin if the session is still `active`.

---

## Round

A single voting iteration within a Session.

**Properties**: `sessionId`, `status` (`in-progress` | `revealed` | `finished`), `averageVote`

**Lifecycle**: `in-progress` → `revealed` → `finished` → *(new round starts at `in-progress`)*

**Business Rules**:
- A new round can only be started when the latest round has status `revealed`.
- Revoting is only allowed when the round status is `revealed`.
- `averageVote` is computed when the round status changes to `revealed`. It:
  - Excludes votes with `value < 0` (i.e. `?` and `🙅🏼` cards).
  - Excludes votes from participants who are not `active` or have role `spectator` at reveal time.
  - Is rounded to 2 decimal places; defaults to `0` if no valid votes exist.

---

## Vote

A single participant's card selection for a Round. `value` is a raw integer. Card display labels (e.g. `"XS"`, `"8"`) are derived client-side from the session's `votingSystem` via `getCards()`.

**Properties**: `roundId`, `participantId`, `value`

- Fibonacci values: `0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, -1 (?), -2 (🙅🏼)`
- T-shirt values: `0 (XS), 1 (S), 2 (M), 3 (L), 4 (XL), 5 (XXL), -1 (?), -2 (🙅🏼)`

**Business Rules**:
- Votes can only be cast or updated when the round status is `in-progress`.
- Only eligible participants (non-spectator, active) can cast a vote.
