import { Router, Request, Response } from 'express';
import { ColumnIdentifier } from '../../type';
import column from './column';

const router = Router();

const get = (_req: Request, res: Response<ColumnIdentifier[]>) => {
  const response: ColumnIdentifier[] = [];
  res.status(200).send(response);
};

router.use('/:id', column.router).get('/', get);

export default { router };
