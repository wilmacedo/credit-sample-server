import { errorHandler } from '@/utils/error-handler';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { usersRouter } from './http/controllers/users/routes';

export const app = express();

app.use(cors());
app.use(express.urlencoded({ limit: '1mb', extended: true }));
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

app.get('/health', (_, response) => {
  return response.status(200).json({ health: 'ok' });
});

app.use(usersRouter);

app.use(errorHandler);
