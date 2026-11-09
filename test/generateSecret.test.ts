import { expect, test } from "vitest";
import { generateSecret } from "../src/generateSecret";

test("preserves a leading zero", () => {
  expect(generateSecret(4, 10, () => 0)).toBe("0123");
});

test("generates six distinct hexadecimal digits", () => {
  const secret = generateSecret(6, 16, () => 0.99);

  expect(secret).toMatch(/^[0-9a-f]{6}$/);
  expect(new Set(secret).size).toBe(6);
});

test("uses the supplied source of randomness", () => {
  const first = generateSecret(2, 2, () => 0);
  const last = generateSecret(2, 2, () => 0.99);

  expect(first).toBe("01");
  expect(last).toBe("10");
});
