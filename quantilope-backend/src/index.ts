import express, { Express } from 'express';
import route from './route';
import { API_PORT } from './constant';

const app: Express = express();

app.use('/api', route.router);
app.set('Content-Type', 'application/json');

app.listen(API_PORT, () => console.log(`Running on port ${API_PORT}`));
