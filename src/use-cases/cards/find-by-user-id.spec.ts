import { InMemoryCardRepository } from '@/repositories/in-memory/in-memory-card-repository';
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository';
import { User } from '@prisma/client';
import { beforeEach, describe, expect, it } from 'vitest';
import { UserNotExistsError } from '../errors/user-not-exists-error';
import { FindByUserId } from './find-by-user-id';

let userRepository: InMemoryUserRepository;
let cardRepository: InMemoryCardRepository;
let sut: FindByUserId;
let user: User;

describe('Find by user id case', () => {
  beforeEach(async () => {
    userRepository = new InMemoryUserRepository();
    cardRepository = new InMemoryCardRepository();
    sut = new FindByUserId(cardRepository, userRepository);

    user = await userRepository.create({
      email: 'wil.macedo.sa@gmail.com',
      name: 'Wil Macedo',
      password: '123456',
    });

    await cardRepository.create({
      cardholder: 'Wil Macedo',
      cvv: '123',
      expiration: new Date(),
      number: '1234567890123452',
      User: {
        connect: {
          id: user.id,
        },
      },
    });
  });

  it('should be able to find cards by user id', async () => {
    const { cards } = await sut.execute({ userId: user.id });

    expect(cards).toHaveLength(1);
  });

  it('should be not able to find cards by invalid user id', async () => {
    expect(sut.execute({ userId: '64c5947dc9c231e389a6d87c' })).rejects.toThrow(
      UserNotExistsError,
    );
  });
});
