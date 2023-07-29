import { Card, Prisma } from '@prisma/client';

export interface CardRepository {
  findById(id: string): Promise<Card | null>;
  findByNumber(number: string): Promise<Card | null>;
  findByUserId(userId: string): Promise<Card[]>;
  create(data: Prisma.CardCreateInput): Promise<Card>;
}
