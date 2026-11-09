import { expect, test } from "vitest";
import { evaluateGuess } from "../src/evaluateGuess";

test("counts every exact match as a bull", () => {
  expect(evaluateGuess("1234", "1234")).toEqual({ bulls: 4, cows: 0 });
});

test("separates bulls from cows", () => {
  expect(evaluateGuess("1234", "1325")).toEqual({ bulls: 1, cows: 2 });
});

test("compares hexadecimal digits case-insensitively", () => {
  expect(evaluateGuess("a1b2", "A2B1")).toEqual({ bulls: 2, cows: 2 });
});
