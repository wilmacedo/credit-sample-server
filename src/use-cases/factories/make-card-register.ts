import { PrismaCardRepository } from '@/repositories/prisma/prisma-card-repository';
import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository';
import { Register } from '../cards/register';

export function makeCardRegister() {
  const userRepository = new PrismaUserRepository();
  const cardRepository = new PrismaCardRepository();
  const register = new Register(cardRepository, userRepository);

  return register;
}
