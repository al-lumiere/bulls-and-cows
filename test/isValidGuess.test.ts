import { expect, test } from "vitest";
import { isValidGuess } from "../src/isValidGuess";

test("accepts a valid guess with a leading zero", () => {
  expect(isValidGuess("0123", 4, 10)).toBe(true);
});

test("accepts uppercase hexadecimal digits", () => {
  expect(isValidGuess("A1B2", 4, 16)).toBe(true);
});

test("rejects a guess of the wrong length", () => {
  expect(isValidGuess("123", 4, 10)).toBe(false);
});

test("rejects a digit outside the given base", () => {
  expect(isValidGuess("02", 2, 2)).toBe(false);
});

test("treats lowercase and uppercase letters as duplicates", () => {
  expect(isValidGuess("aA12", 4, 16)).toBe(false);
});
