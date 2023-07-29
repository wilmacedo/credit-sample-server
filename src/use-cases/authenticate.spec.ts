import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository';
import { hash } from 'bcrypt';
import { beforeEach, describe, expect, it } from 'vitest';
import { Authenticate } from './authenticate';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';

let userRepository: InMemoryUserRepository;
let sut: Authenticate;

describe('Authenticate case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    sut = new Authenticate(userRepository);
  });

  it('should be able to authenticate', async () => {
    await userRepository.create({
      name: 'Wil Macedo',
      email: 'wil.macedo.sa@gmail.com',
      password: await hash('123456', 6),
    });

    const { user } = await sut.execute({
      email: 'wil.macedo.sa@gmail.com',
      password: '123456',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'wil.macedo.sa@gmail.com',
        password: '123456',
      }),
    ).rejects.toThrow(InvalidCredentialsError);
  });

  it('should not be able to authenticate with wrong email', async () => {
    await userRepository.create({
      name: 'Wil Macedo',
      email: 'wil.macedo.sa@gmail.com',
      password: await hash('123456', 6),
    });

    await expect(() =>
      sut.execute({
        email: 'wil.macedo.sa@gmail.com',
        password: '654321',
      }),
    ).rejects.toThrow(InvalidCredentialsError);
  });
});
