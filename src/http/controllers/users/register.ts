import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error';
import { makeUserRegister } from '@/use-cases/factories/make-user-register';
import { Request, Response } from 'express';
import { z } from 'zod';

export async function register(request: Request, response: Response) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  try {
    const registerCase = makeUserRegister();

    await registerCase.execute({
      name,
      email,
      password,
    });
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return response.status(409).json({ message: error.message });
    }

    throw error;
  }

  return response.sendStatus(201);
}
