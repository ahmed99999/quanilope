import { Router, Request, Response } from 'express';
import { RowIdentifier, RowRequest } from '../../../type';

const router = Router({ mergeParams: true });

const get = (_req: Request, res: Response<RowIdentifier>) => {
  const response: RowIdentifier = {
    id: '0',
    image: '',
    name: 'col1',
  };

  res.status(200).send(response);
};

const post = (req: Request, res: Response<RowIdentifier>) => {
  const params = req.body as RowRequest;

  res.send({ ...params, id: '1' });
};

const put = (req: Request, res: Response<RowIdentifier>) => {
  const params = req.body as RowRequest;

  res.send({ ...params, id: '1' });
};

const remove = (req: Request, res: Response<RowIdentifier>) => {
  const params = req.body as RowRequest;

  res.send({ ...params, id: '1' });
};

router.route('/').get(get).post(post).put(put).delete(remove);

export default { router };
