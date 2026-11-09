const cache = new Map<string, number>();

export function countPossibleSecrets(length: number, base: number): number {
  if (
    !Number.isInteger(length) ||
    !Number.isInteger(base) ||
    length < 0 ||
    length > base
  ) {
    return 0;
  }

  if (length === 0) {
    return 1;
  }

  const key = `${length}:${base}`;
  const cached = cache.get(key);

  if (cached !== undefined) {
    return cached;
  }

  const result = base * countPossibleSecrets(length - 1, base - 1);
  cache.set(key, result);
  return result;
}
