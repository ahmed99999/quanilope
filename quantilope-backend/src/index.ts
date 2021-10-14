import express, { Express } from 'express';
const app: Express = express();

const port = 5000;
app.get('/', (_, res) => {
  res.status(200).send();
});
app.listen(port, () => console.log(`Running on port ${port}`));
