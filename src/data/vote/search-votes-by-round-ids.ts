import chunk from '@chanom/utils/chunk';

import { searchVotes } from './search-votes';

/** Firestore allows at most 30 values in an `in` filter */
const MAX_IN_FILTER_VALUES = 30;

/**
 * Search the votes of the given rounds. Round ids are queried in batches
 * to stay within the Firestore `in` filter limit.
 *
 * @param roundIds The round ids
 * @returns The votes of all the given rounds
 */
export async function searchVotesByRoundIds(roundIds: string[]) {
  const results = await Promise.all(
    chunk(roundIds, MAX_IN_FILTER_VALUES).map((ids) =>
      searchVotes({ filter: { roundId: { op: 'in', value: ids } } }),
    ),
  );
  return results.flat();
}
