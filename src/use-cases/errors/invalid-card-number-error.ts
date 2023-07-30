export class InvalidCardNumberError extends Error {
  constructor() {
    super('Invalid card number');
  }
}
