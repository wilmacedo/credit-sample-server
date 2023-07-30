import { Card, Prisma } from '@prisma/client';
import { randomUUID } from 'crypto';
import { CardRepository } from '../CardRepository';

export class InMemoryCardRepository implements CardRepository {
  cards: Card[] = [];

  async findById(id: string): Promise<Card | null> {
    const card = this.cards.find(card => card.id === id);

    return card || null;
  }

  async findByUserId(userId: string): Promise<Card[]> {
    const cards = this.cards.filter(card => card.userId === userId);

    return cards;
  }

  async findByNumber(number: string): Promise<Card | null> {
    const card = this.cards.find(card => card.number === number);
    if (!card) return null;

    return card;
  }

  async create(data: Prisma.CardCreateInput): Promise<Card> {
    const card: Card = {
      id: randomUUID(),
      cardholder: data.cardholder,
      cvv: data.cvv,
      expiration: new Date(data.expiration),
      number: data.number,
      userId: (data.User.connect || { id: '1' }).id || '1',
    };

    this.cards.push(card);

    return card;
  }
}
