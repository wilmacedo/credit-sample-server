import { UserNotExistsError } from '@/use-cases/errors/user-not-exists-error';
import { makeFindByUserId } from '@/use-cases/factories/make-find-by-user-id';
import { Request, Response } from 'express';
import { z } from 'zod';

export async function findByUserId(request: Request, response: Response) {
  const findByUserIdParamsSchema = z.object({
    userId: z.string(),
  });

  const { userId } = findByUserIdParamsSchema.parse(request.params);

  try {
    const findByUserIdCase = makeFindByUserId();

    const { cards } = await findByUserIdCase.execute({ userId });

    return response.status(200).json({ cards });
  } catch (error) {
    if (error instanceof UserNotExistsError) {
      return response.status(404).json({ message: error.message });
    }

    throw error;
  }
}
