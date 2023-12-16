/**
 * Extracts multiple custom separators from a custom separator line and returns either a single string
 * or a regular expression that matches any of the extracted separators.
 *
 * @param {string} customSeparatorLine - The line containing custom separators enclosed in square brackets.
 * @returns {string | RegExp | null} The extracted separator(s) as a string, a regular expression, or null if no separator is found.
 */
function getCustomMultiCharSeparator(customSeparatorLine: string) {
  const regex = /\[([^\]]*)\]/g;
  const matchedSeparators: string[] = [];
  let match: RegExpExecArray | null = null;

  while ((match = regex.exec(customSeparatorLine)) !== null) {
    if (match[1]) {
      matchedSeparators.push(match[1]);
    }
  }

  // If the is only one matched separator, we can directly return it as a string.
  if (matchedSeparators.length === 1) {
    return matchedSeparators[0];
  }

  // If there are more than one matched separators, we need to construct a regex and return it.
  // Note: We need to escape some chars so that they are considered as literals.
  if (matchedSeparators.length > 1) {
    const escapedSeparators = matchedSeparators.map(char => char.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
    return new RegExp(escapedSeparators);
  }

  return null;
}

/**
 * Extracts and returns the custom separator from a string of numbers, identified by a custom separator identifier.
 * If the string does not start with the custom separator identifier or if there is no custom separator, returns null.
 *
 * @param {string} numbers - The string containing numbers, possibly preceded by a custom separator.
 * @param {string} customSeparatorIdentifier - The identifier marking the start of the custom separator.
 * @returns {string | null} The extracted custom separator, or null if not present or invalid.
 */
function getCustomSeparator(numbers: string, customSeparatorIdentifier: string): string | RegExp | null {
  const customSeparatorIdentifierLength = customSeparatorIdentifier.length;

  if (!numbers.startsWith(customSeparatorIdentifier)) {
    return null;
  }

  const customSeparatorLine = numbers.split('\n')[0];
  const customMultiCharSeparator = getCustomMultiCharSeparator(customSeparatorLine);

  // If a custom multi char separator is not present, we consider only a single separator to be present.
  return customMultiCharSeparator ?? customSeparatorLine.substring(customSeparatorIdentifierLength);
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
    throw new Error(`negatives not allowed, found ${negativeNumbers.join(',')}`);
  }

  return numbersToAdd.reduce((sum, number) => sum += number <= 1000 ? number : 0, 0);
}
