import { CardRepository } from '@/repositories/CardRepository';
import { UserRepository } from '@/repositories/UserRepository';
import { Card } from '@prisma/client';
import { CardAlreadyRegisteredError } from '../errors/card-already-registered-error';
import { UserNotExistsError } from '../errors/user-not-exists-error';

export interface RegisterRequest {
  number: string;
  cardholder: string;
  cvv: string;
  expiration: Date;
  userId: string;
}

export interface RegisterResponse {
  card: Card;
}

export class Register {
  constructor(
    private cardRepository: CardRepository,
    private userRepository: UserRepository,
  ) {}

  async execute({
    cardholder,
    cvv,
    expiration,
    number,
    userId,
  }: RegisterRequest): Promise<RegisterResponse> {
    const cardWithSameNumber = await this.cardRepository.findByNumber(number);
    if (cardWithSameNumber) {
      throw new CardAlreadyRegisteredError();
    }

    const userExist = await this.userRepository.findById(userId);
    if (!userExist) {
      throw new UserNotExistsError();
    }

    const card = await this.cardRepository.create({
      cardholder,
      cvv,
      expiration,
      number,
      User: {
        connect: {
          id: userId,
        },
      },
    });

    return { card };
  }
}
