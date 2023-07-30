import { CardRepository } from '@/repositories/CardRepository';
import { UserRepository } from '@/repositories/UserRepository';
import { Card } from '@prisma/client';
import { UserNotExistsError } from '../errors/user-not-exists-error';

export interface FindByUserIdRequest {
  userId: string;
}

export interface FindByUserIdResponse {
  cards: Card[];
}

export class FindByUserId {
  constructor(
    private cardRepository: CardRepository,
    private userRepository: UserRepository,
  ) {}

  async execute({
    userId,
  }: FindByUserIdRequest): Promise<FindByUserIdResponse> {
    const userExist = await this.userRepository.findById(userId);
    if (!userExist) {
      throw new UserNotExistsError();
    }

    const cards = await this.cardRepository.findByUserId(userId);

    return { cards };
  }
}
