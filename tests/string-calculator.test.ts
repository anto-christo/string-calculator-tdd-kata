import { add } from "../src/string-calculator";

describe('The string calculator', () => {
  test('should return zero for an empty input string', () => {
    const result = add("");
    expect(result).toBe(0);
  })

  test('should return the same number if the input string only has a single number', () => {
    const result = add("1");
    expect(result).toBe(1);
  })

  test('should return the sum of two numbers if the input string has two comma-separated numbers', () => {
    const result = add("1,2");
    expect(result).toBe(3);
  })

  test('should return the sum of all numbers if the input string has more than two comma-separated numbers', () => {
    const result = add("1,2,3");
    expect(result).toBe(6);
  })

  test('should return the sum of all numbers if the input string has newline and comma separators', () => {
    const result = add("1\n2,3");
    expect(result).toBe(6);
  })

  test('should return the sum of all numbers if the input string has a custom separator', () => {
    const result = add("//;\n1;2");
    expect(result).toBe(3);
  })
})
