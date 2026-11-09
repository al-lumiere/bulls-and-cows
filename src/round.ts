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
