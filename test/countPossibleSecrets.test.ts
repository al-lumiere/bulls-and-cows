import { expect, test } from "vitest";
import { countPossibleSecrets } from "../src/countPossibleSecrets";

test("counts both binary codes of length two", () => {
  expect(countPossibleSecrets(2, 2)).toBe(2);
});

test("counts decimal codes including those with a leading zero", () => {
  expect(countPossibleSecrets(4, 10)).toBe(5040);
});

test("counts one empty code at length zero", () => {
  expect(countPossibleSecrets(0, 10)).toBe(1);
});

test("returns zero when there are too few distinct digits", () => {
  expect(countPossibleSecrets(3, 2)).toBe(0);
});
