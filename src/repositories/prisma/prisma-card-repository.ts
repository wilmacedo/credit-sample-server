import { prisma } from '@/lib/prisma';
import { Card, Prisma } from '@prisma/client';
import { CardRepository } from '../CardRepository';

export class PrismaCardRepository implements CardRepository {
  async findById(id: string): Promise<Card | null> {
    const card = await prisma.card.findUnique({ where: { id } });

    return card;
  }

  async findByUserId(userId: string): Promise<Card[]> {
    const cards = await prisma.card.findMany({ where: { userId } });

    return cards;
  }

  async findByNumber(number: string): Promise<Card | null> {
    const card = await prisma.card.findUnique({ where: { number } });

    return card;
  }

  async create(data: Prisma.CardCreateInput): Promise<Card> {
    const card = await prisma.card.create({ data });

    return card;
  }
}
