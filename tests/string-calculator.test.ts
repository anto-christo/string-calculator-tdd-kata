import { add } from "../src/string-calculator";

describe('The string calculator', () => {
  test('should return zero for an empty string', () => {
    const result = add("");
    expect(result).toBe(0);
  })

  test('should return the same number if the string only has a single number', () => {
    const result = add("1");
    expect(result).toBe(1);
  })
})
