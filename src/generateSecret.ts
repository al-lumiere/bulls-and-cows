import { DIGITS } from "./createDigitValidator";

export function generateSecret(
  length: number,
  base: number,
  random: () => number = Math.random,
): string {
  const availableDigits = [...DIGITS.slice(0, base)];

  if (length > availableDigits.length) {
    throw new RangeError("Not enough unique digits");
  }

  return Array.from({ length }, () => {
    const index = Math.floor(random() * availableDigits.length);
    const [digit] = availableDigits.splice(index, 1);
    return digit;
  }).join("");
}
