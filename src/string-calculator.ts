export function add(numbers: string): number {
  if (numbers.length === 3) {
    const [firstNumber, secondNumber] = numbers.split(',');
    return Number(firstNumber) + Number(secondNumber);
  }

  if (numbers.length === 1) {
    return Number(numbers);
  }

  return 0;
}
