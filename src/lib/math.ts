import Big from 'big.js';

/**
 * Calculate the average of an array of numbers.
 *
 * @param values Array of numbers
 * @returns The average of the array of numbers in number format
 */
export function calculateAverage(values: number[]) {
  if (!values.length) {
    return 0;
  }
  const sum = values.reduce((acc, value) => acc.plus(value), new Big(0));
  return sum.div(values.length).round(2).toNumber();
}
