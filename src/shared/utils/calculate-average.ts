import Big from "big.js";

const DECIMAL_POINTS = 2;

/**
 * Calculate the average of an array of numbers.
 *
 * @param values Array of numbers
 * @returns The average of the array of numbers in string format
 */
export function calculateAverage(values: number[]) {
  if (!values.length) {
    return (0).toFixed(DECIMAL_POINTS);
  }
  const sum = values.reduce((acc, value) => acc.plus(value), new Big(0));
  return sum.div(values.length).toFixed(DECIMAL_POINTS);
}
