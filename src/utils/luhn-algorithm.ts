/**
 * This is a Luhn algorithm modification for Typescript for ProjectBroadcast test assessment.
 * Original gist: https://gist.github.com/ShirtlessKirk/2134376
 */

export function luhnValidator(cardNumber: string): boolean {
  const mappingNumbers = [0, 2, 4, 6, 8, 1, 3, 5, 7, 9];

  let length = cardNumber.length;
  const bit = 1;
  let sum = 0;
  let index: number;

  while (length) {
    index = parseInt(cardNumber.charAt(--length), 10);

    sum += bit ? mappingNumbers[index] : index;
  }

  return sum ? sum % 10 === 0 : false;
}
