/**
 * Extracts and returns the custom separator from a string of numbers, identified by a custom separator identifier.
 * If the string does not start with the custom separator identifier or if there is no custom separator, returns null.
 *
 * @param {string} numbers - The string containing numbers, possibly preceded by a custom separator.
 * @param {string} customSeparatorIdentifier - The identifier marking the start of the custom separator.
 * @returns {string | null} The extracted custom separator, or null if not present or invalid.
 */
function getCustomSeparator(numbers: string, customSeparatorIdentifier: string) {
  const customSeparatorIdentifierLength = customSeparatorIdentifier.length

  if (!numbers.startsWith(customSeparatorIdentifier)) {
    return null;
  }

  const [customSeparatorLine, numbersLine] = numbers.split('\n');

  /**
   * If the length of separator line is same as custom identifier length, then there is no separator.
   * If the numbersLine is undefined, it means there was no `\n` in the string and hence no numbers to add.
   * Note: we would still consider no numbers after a `\n` since that is essentially an empty string.
   */
  if (customSeparatorLine.length === customSeparatorIdentifierLength && numbersLine === undefined) {
    return null;
  }

  return customSeparatorLine.substring(customSeparatorIdentifierLength);
}

/**
 * Adds the given sequence of numbers
 * @param numbers a comma-separated string of numbers
 * @returns the sum of given numbers
 */
export function add(numbers: string): number {
  let separator: RegExp | string = /,|\n/;
  const customSeparator = getCustomSeparator(numbers, "//");

  if (customSeparator) {
    numbers = numbers.split('\n')[1];
    separator = customSeparator;
  }

  const numbersToAdd = numbers.split(separator).map(number => Number(number));
  const negativeNumbers = numbersToAdd.filter(number => number < 0);

  if (negativeNumbers.length > 0) {
    throw new Error(`negatives not allowed, found ${negativeNumbers.join(',')}`)
  }

  return numbersToAdd.reduce((sum, number) => sum + number, 0);
}
