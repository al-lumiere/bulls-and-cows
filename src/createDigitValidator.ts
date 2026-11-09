const DIGITS = "0123456789abcdef";

export function createDigitValidator(base: number): (digit: string) => boolean {
  const allowedDigits = DIGITS.slice(0, base);

  return (digit) =>
    digit.length === 1 && allowedDigits.includes(digit.toLowerCase());
}
