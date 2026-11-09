import { evaluateGuess } from "./evaluateGuess";
import { isValidGuess } from "./isValidGuess";

export type GuessEntry = Readonly<{
  guess: string;
  bulls: number;
  cows: number;
}>;

export type Round = Readonly<{
  secret: string;
  base: number;
  startedAt: number;
  finishedAt: number | null;
  history: readonly GuessEntry[];
}>;

export function startRound(
  secret: string,
  base: number,
  startedAt: number,
): Round {
  return {
    secret,
    base,
    startedAt,
    finishedAt: null,
    history: [],
  };
}

type GuessSubmission =
  | { status: "accepted"; round: Round }
  | { status: "invalid" | "duplicate" | "finished" };

export function submitGuess(
  round: Round,
  guess: string,
  submittedAt: number,
): GuessSubmission {
  if (round.finishedAt !== null) {
    return { status: "finished" };
  }

  const normalizedGuess = guess.toLowerCase();
  const length = round.secret.length;

  if (!isValidGuess(normalizedGuess, length, round.base)) {
    return { status: "invalid" };
  }

  if (round.history.some((entry) => entry.guess === normalizedGuess)) {
    return { status: "duplicate" };
  }

  const entry = {
    guess: normalizedGuess,
    ...evaluateGuess(round.secret, normalizedGuess),
  };

  return {
    status: "accepted",
    round: {
      ...round,
      history: [...round.history, entry],
      finishedAt: entry.bulls === length ? submittedAt : null,
    },
  };
}
