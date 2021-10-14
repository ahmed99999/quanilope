import { Router, Request, Response } from 'express';
import { RowIdentifier } from '../../type';

const router = Router();

const get = (_req: Request, res: Response<RowIdentifier[]>) => {
  const response: RowIdentifier[] = [];
  res.status(200).send(response);
};

router.get('/', get);

export default { router };
