/**
 * This is a Luhn algorithm modification for Typescript for ProjectBroadcast test assessment.
 * Original gist: https://gist.github.com/ShirtlessKirk/2134376
 */

export function luhnValidator(cardNumber: string): boolean {
  const mappingNumbers = [0, 2, 4, 6, 8, 1, 3, 5, 7, 9];

  let length = cardNumber.length;
  let bit = 1;
  let sum = 0;
  let digit: number;

  while (length) {
    digit = parseInt(cardNumber.charAt(--length), 10);

    if (isNaN(digit)) {
      return false;
    }

    bit ^= 1;
    if (bit) {
      digit = mappingNumbers[digit];
    }

    sum += digit > 9 ? digit - 9 : digit;
  }

  return sum % 10 === 0;
}
