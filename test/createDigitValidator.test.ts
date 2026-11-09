import { expect, test } from "vitest";
import { createDigitValidator } from "../src/createDigitValidator";

test("accepts only 0 and 1 in binary", () => {
  const isBinary = createDigitValidator(2);

  expect(isBinary("0")).toBe(true);
  expect(isBinary("1")).toBe(true);
  expect(isBinary("2")).toBe(false);
});

test("accepts uppercase and lowercase hexadecimal digits", () => {
  const isHex = createDigitValidator(16);

  expect(isHex("a")).toBe(true);
  expect(isHex("A")).toBe(true);
  expect(isHex("G")).toBe(false);
});

test("accepts a single digit only", () => {
  const isDecimal = createDigitValidator(10);

  expect(isDecimal("9")).toBe(true);
  expect(isDecimal("10")).toBe(false);
  expect(isDecimal("")).toBe(false);
});
