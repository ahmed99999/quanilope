import express, { Express } from 'express';
import route from './route';
import { API_PORT, DATABASE_URL } from './constant';
import database from './service/database';
import { config } from 'dotenv';

const app: Express = express();

app.use('/api', route.router);
app.set('Content-Type', 'application/json');

database(
  DATABASE_URL.replace(
    '<user_name>',
    process.env.DB_USER_NAME as string
  ).replace('<password>', process.env.DB_PASSWORD as string)
);

app.listen(API_PORT, () => console.log(`Running on port ${API_PORT}`));
