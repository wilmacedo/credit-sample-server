import { describe, expect, it } from 'vitest';
import { luhnValidator } from './luhn-algorithm';

describe('Luhn algorithm case', () => {
  it('should be able return true when number is valid', () => {
    const validNumber = '1234567890123452';

    expect(luhnValidator(validNumber)).toBeTruthy();
  });

  it('should be not able return true when number is invalid', () => {
    const validNumber = '1234567890123451';

    expect(luhnValidator(validNumber)).toBeFalsy();
  });
});
