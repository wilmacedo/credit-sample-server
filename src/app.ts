import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

export const app = express();

app.use(cors());
app.use(express.urlencoded({ limit: '1mb', extended: true }));
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

app.get('/', (_, response) => {
  return response.status(200).json({ health: 'ok' });
});
