import { describe, expect, it } from 'vitest';
import { calculateAverage } from '../math';

describe('calculateAverage', () => {
  it('should return 0 for empty array', () => {
    expect(calculateAverage([])).toBe(0);
  });

  it('should calculate average correctly for positive numbers', () => {
    const values = [1, 2, 3, 4, 5];
    expect(calculateAverage(values)).toBe(3);
  });

  it('should handle decimal numbers', () => {
    const values = [1.5, 2.5, 3.5];
    expect(calculateAverage(values)).toBe(2.5);
  });

  it('should handle very large numbers', () => {
    const values = [1000000000, 2000000000, 3000000000];
    expect(calculateAverage(values)).toBe(2000000000);
  });

  it('should handle negative numbers', () => {
    const values = [-1, -2, -3];
    expect(calculateAverage(values)).toBe(-2);
  });

  it('should handle mixed positive and negative numbers', () => {
    const values = [-1, 2, -3, 4];
    expect(calculateAverage(values)).toBe(0.5);
  });

  it('should maintain precision for numbers with many decimal places', () => {
    const values = [0.1, 0.2, 0.3];
    expect(calculateAverage(values)).toBe(0.2);
  });
});
