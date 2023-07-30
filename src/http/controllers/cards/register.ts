import { CardAlreadyRegisteredError } from '@/use-cases/errors/card-already-registered-error';
import { InvalidCardNumberError } from '@/use-cases/errors/invalid-card-number-error';
import { UserNotExistsError } from '@/use-cases/errors/user-not-exists-error';
import { makeCardRegister } from '@/use-cases/factories/make-card-register';
import { Request, Response } from 'express';
import { z } from 'zod';

export async function register(request: Request, response: Response) {
  const registerBodySchema = z.object({
    number: z.string().min(15).max(16),
    cardholder: z.string(),
    cvv: z.string().min(3).max(4),
    expiration: z.coerce.date(),
    userId: z.string(),
  });

  const { number, cardholder, cvv, expiration, userId } =
    registerBodySchema.parse(request.body);

  try {
    const registerCase = makeCardRegister();

    await registerCase.execute({
      cardholder,
      cvv,
      expiration,
      number,
      userId,
    });
  } catch (error) {
    if (
      error instanceof CardAlreadyRegisteredError ||
      error instanceof UserNotExistsError ||
      error instanceof InvalidCardNumberError
    ) {
      return response.status(409).json({ message: error.message });
    }

    throw error;
  }

  return response.sendStatus(201);
}
