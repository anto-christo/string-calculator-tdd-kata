/**
 * Adds the given sequence of numbers
 * @param numbers a comma-separated string of numbers
 * @returns the sum of given numbers
 */
export function add(numbers: string): number {
  let separator: RegExp | string = /,|\n/;

  if (numbers.startsWith("//")) {
    const [separatorLine, numbersLine] = numbers.split('\n');

    if (separatorLine && numbersLine) {
      separator = separatorLine.substring(2);
      numbers = numbersLine;
    }
  }

  const numbersToAdd = numbers.split(separator).map(number => Number(number));
  return numbersToAdd.reduce((sum, number) => sum + number, 0);
}
