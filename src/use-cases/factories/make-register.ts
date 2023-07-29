import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository';
import { Register } from '../register';

export function makeRegister() {
  const userRepository = new PrismaUserRepository();
  const register = new Register(userRepository);

  return register;
}
