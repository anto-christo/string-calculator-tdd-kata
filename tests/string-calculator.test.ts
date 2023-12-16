import { add } from "../src/string-calculator";

describe('The string calculator', () => {
  test('should return zero for an empty string', () => {
    const result = add("");
    expect(result).toBe(0);
  })
})
