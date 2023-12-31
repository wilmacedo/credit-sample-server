import { verifyJwt } from '@/http/middleware/verify-jwt';
import { Router } from 'express';
import { findByUserId } from './find-by-user-id';
import { register } from './register';

export const cardsRouter = Router();

cardsRouter.post('/cards', verifyJwt, register);
cardsRouter.get('/cards/:userId', verifyJwt, findByUserId);
