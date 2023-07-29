import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository';
import { Authenticate } from '../users/authenticate';

export function makeAuthenticate() {
  const userRepository = new PrismaUserRepository();
  const authenticate = new Authenticate(userRepository);

  return authenticate;
}
