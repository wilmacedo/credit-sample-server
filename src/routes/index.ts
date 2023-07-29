import { cardsRouter } from '@/http/controllers/cards/routes';
import { usersRouter } from '@/http/controllers/users/routes';
import { Router } from 'express';

export const router = Router();

router.use(usersRouter);
router.use(cardsRouter);
