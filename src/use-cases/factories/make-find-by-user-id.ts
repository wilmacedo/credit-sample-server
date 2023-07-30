import { PrismaCardRepository } from '@/repositories/prisma/prisma-card-repository';
import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository';
import { FindByUserId } from '../cards/find-by-user-id';

export function makeFindByUserId() {
  const userRepository = new PrismaUserRepository();
  const cardRepository = new PrismaCardRepository();
  const findByUserId = new FindByUserId(cardRepository, userRepository);

  return findByUserId;
}
