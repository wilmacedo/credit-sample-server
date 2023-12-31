import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository';
import { Register } from '../users/register';

export function makeUserRegister() {
  const userRepository = new PrismaUserRepository();
  const register = new Register(userRepository);

  return register;
}
