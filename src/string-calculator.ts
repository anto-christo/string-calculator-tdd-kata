/**
 * Adds the given sequence of numbers
 * @param numbers a comma-separated string of numbers
 * @returns the sum of given numbers
 */
export function add(numbers: string): number {
  const numbersToAdd = numbers.split(/,|\n/).map(number => Number(number));
  return numbersToAdd.reduce((sum, number) => sum + number, 0)
}
