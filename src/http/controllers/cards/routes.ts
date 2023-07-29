import { Router } from 'express';
import { register } from './register';

export const cardsRouter = Router();

cardsRouter.post('/cards', register);
