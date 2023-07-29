export class CardAlreadyRegisteredError extends Error {
  constructor() {
    super('Card already registered');
  }
}
