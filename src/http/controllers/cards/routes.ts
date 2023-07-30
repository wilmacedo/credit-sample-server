import { verifyJwt } from '@/http/middleware/verify-jwt';
import { Router } from 'express';
import { register } from './register';

export const cardsRouter = Router();

cardsRouter.post('/cards', verifyJwt, register);
