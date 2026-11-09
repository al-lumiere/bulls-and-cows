type Score = {
  attempts: number;
  elapsedMs: number;
};

function storageKey(base: number, length: number): string {
  return `bulls-and-cows:records:${base}:${length}`;
}

export function loadRecords(base: number, length: number): Score[] {
  try {
    const saved = localStorage.getItem(storageKey(base, length));
    return saved === null ? [] : (JSON.parse(saved) as Score[]);
  } catch {
    return [];
  }
}

export function saveRecord(base: number, length: number, score: Score): void {
  const best = [...loadRecords(base, length), score]
    .sort((a, b) => a.attempts - b.attempts || a.elapsedMs - b.elapsedMs)
    .slice(0, 5);

  localStorage.setItem(storageKey(base, length), JSON.stringify(best));
}
