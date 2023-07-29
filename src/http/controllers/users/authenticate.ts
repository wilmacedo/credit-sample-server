import { env } from '@/env';
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error';
import { makeAuthenticate } from '@/use-cases/factories/make-authenticate';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

export async function authenticate(request: Request, response: Response) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const authenticateCase = makeAuthenticate();

    const { user } = await authenticateCase.execute({ email, password });

    const token = jwt.sign({ name: user.name }, env.JWT_SECRET);

    return response.status(200).json({ token });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return response.status(401).json({ message: error.message });
    }

    throw error;
  }
}
