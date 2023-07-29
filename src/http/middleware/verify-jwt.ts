import { env } from '@/env';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export async function verifyJwt(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const { authorization } = request.headers;
    if (!authorization) {
      return new Error();
    }

    const [, token] = authorization.split(' ');
    const { name } = jwt.verify(token, env.JWT_SECRET) as { name: string };

    if (!name) {
      throw new Error();
    }

    next();
  } catch (error) {
    return response.status(401).send({ message: 'Unauthorized' });
  }
}
