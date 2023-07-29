import { Prisma, User } from '@prisma/client';
import { randomUUID } from 'crypto';
import { UserRepository } from '../UserRepository';

export class InMemoryUserRepository implements UserRepository {
  users: User[] = [];

  async findById(id: string): Promise<User | null> {
    const user = this.users.find(user => user.id === id);

    return user || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find(user => user.email === email);

    return user || null;
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user: User = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password: data.password,
    };

    this.users.push(user);

    return user;
  }
}
