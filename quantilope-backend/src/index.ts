import express, { Express } from 'express';
import route from './route';
import { API_PORT, DATABASE_URL } from './constant';
import database from './service/database';
import cors from 'cors';
// import { config } from 'dotenv';

// config();

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('Content-Type', 'application/json');

// console.log(process.env.DB_USER_NAME, process.env.DB_PASSWORD);
// database(
//   DATABASE_URL.replace(
//     '<user_name>',
//     process.env.DB_USER_NAME as string
//   ).replace('<password>', process.env.DB_PASSWORD as string)
// );

app.use('/', route.router);

database(
  DATABASE_URL.replace('<user_name>', 'ahmedaminhd').replace(
    '<password>',
    '123456hd'
  )
);

app.listen(API_PORT, () => console.log(`Running on port ${API_PORT}`));
