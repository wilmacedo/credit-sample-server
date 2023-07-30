import { env } from '@/env';
import { User } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  user: User;
}

export async function verifyJwt(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const { authorization } = request.headers;
    if (!authorization) {
      throw new Error();
    }

    const [, token] = authorization.split(' ');
    const { user } = jwt.verify(token, env.JWT_SECRET) as JwtPayload;

    if (!user) {
      throw new Error();
    }

    next();
  } catch (error) {
    return response.status(401).send({ message: 'Unauthorized' });
  }
}
