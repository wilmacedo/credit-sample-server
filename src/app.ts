import { errorHandler } from '@/utils/error-handler';
import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import morgan from 'morgan';
import { router } from './routes';

export const app = express();

app.use(cors());
app.use(express.urlencoded({ limit: '1mb', extended: true }));
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

app.get('/health', (_, response) => {
  return response.status(200).json({ health: 'ok' });
});

app.use('/', router);

app.use(errorHandler);
