import { describe, expect, it } from 'vitest';

import { writeXlsxBlob } from '../xlsx';

describe('writeXlsxBlob', () => {
  it('returns a non-empty xlsx blob', async () => {
    const blob = await writeXlsxBlob(
      [
        ['Round', 'Alice', 'Average'],
        [1, 3, 3],
        [2, null, null],
      ],
      'Votes',
    );

    expect(blob).toBeInstanceOf(Blob);
    expect(blob.size).toBeGreaterThan(0);
  });

  it('handles empty rows', async () => {
    const blob = await writeXlsxBlob([], 'Votes');

    expect(blob.size).toBeGreaterThan(0);
  });
});
