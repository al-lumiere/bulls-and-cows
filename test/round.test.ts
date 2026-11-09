import { expect, test } from "vitest";
import { startRound, submitGuess } from "../src/round";

test("adds a guess without changing the previous round", () => {
  const round = startRound("1234", 10, 1000);

  expect(submitGuess(round, "1325", 1500)).toEqual({
    status: "accepted",
    round: {
      ...round,
      history: [{ guess: "1325", bulls: 1, cows: 2 }],
    },
  });
  expect(round.history).toEqual([]);
});

test("rejects a repeated guess regardless of letter case", () => {
  const round = startRound("ab", 16, 1000);
  const first = submitGuess(round, "BA", 1500);

  if (first.status !== "accepted") {
    throw new Error("Expected the first guess to be accepted");
  }

  expect(submitGuess(first.round, "ba", 2000)).toEqual({
    status: "duplicate",
  });
  expect(first.round.history).toHaveLength(1);
});

test("finishes the round when all digits are bulls", () => {
  const round = startRound("0123", 10, 1000);

  expect(submitGuess(round, "0123", 2500)).toEqual({
    status: "accepted",
    round: {
      ...round,
      finishedAt: 2500,
      history: [{ guess: "0123", bulls: 4, cows: 0 }],
    },
  });
});
