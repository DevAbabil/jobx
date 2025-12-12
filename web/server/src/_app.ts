import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { globalErrorHandler, notFound } from '@/app/errors';
import router from '@/app/router';
import { corsOptions, ENV } from '@/config';
import { ping, serverHealth } from '@/shared';

const app = express();

app.set('trust proxy', 1);
app.set('json spaces', 2);

app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));
app.use(cookieParser());
app.use(cors(corsOptions));

if (ENV.NODE_ENV === 'development') {
  app.use((req, _res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });
}

app.get('/', serverHealth);
app.get('/v1/ping', ping);
app.use('/v1', router);

app.use(notFound);
app.use(globalErrorHandler);

export default app;
