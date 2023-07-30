import { InMemoryCardRepository } from '@/repositories/in-memory/in-memory-card-repository';
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository';
import { User } from '@prisma/client';
import { beforeEach, describe, expect, it } from 'vitest';
import { CardAlreadyRegisteredError } from '../errors/card-already-registered-error';
import { UserNotExistsError } from '../errors/user-not-exists-error';
import { Register } from './register';

let userRepository: InMemoryUserRepository;
let cardRepository: InMemoryCardRepository;
let sut: Register;
let user: User;

describe('Register case', () => {
  beforeEach(async () => {
    userRepository = new InMemoryUserRepository();
    cardRepository = new InMemoryCardRepository();
    sut = new Register(cardRepository, userRepository);

    user = await userRepository.create({
      email: 'wil.macedo.sa@gmail.com',
      name: 'Wil Macedo',
      password: '123456',
    });
  });

  it('should be able to register an user', async () => {
    const { card } = await sut.execute({
      cardholder: 'Wil Macedo',
      cvv: '123',
      expiration: new Date(),
      number: '1234567890123452',
      userId: user.id,
    });

    expect(card.id).toEqual(expect.any(String));
  });

  it('should be not able to register an card with same number', async () => {
    const card = {
      cardholder: 'Wil Macedo',
      cvv: '123',
      expiration: new Date(),
      number: '1234567890123452',
      userId: user.id,
    };

    await sut.execute(card);

    expect(sut.execute(card)).rejects.toThrow(CardAlreadyRegisteredError);
  });

  it('should be not able to register an card with invalid user', async () => {
    const card = {
      cardholder: 'Wil Macedo',
      cvv: '123',
      expiration: new Date(),
      number: '1234567890123451',
      userId: '1',
    };

    expect(sut.execute(card)).rejects.toThrow(UserNotExistsError);
  });
});
