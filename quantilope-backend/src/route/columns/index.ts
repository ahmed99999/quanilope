import { Router, Request, Response, NextFunction } from 'express';
import { ApiResponse, ColumnRequest, ColumnIdentifier } from '../../type';
import { ValidationError, CustomError } from '../../error';
import column from './column';

import controller from '../../controller';

const router = Router({ mergeParams: true });

const get = async (req: Request, res: Response<ApiResponse>) => {
  try {
    const columns = await controller.column.getAllColumns();
    res.status(200).send({ data: columns });
  } catch (error) {
    console.error(error);
    res.status(500).send({ data: error });
  }
};

const post = async (
  req: Request,
  res: Response<ApiResponse<ColumnIdentifier>>,
  next: NextFunction
) => {
  try {
    const params = req.body as ColumnRequest;
    const column = await controller.column.createColumn(params);
    res.status(201).send({ data: column });
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      next(new ValidationError(error.message));
    }
    next(new CustomError('something went wrong, try again', 500));
  }
};

router.get('/', get).post('/', post).use('/:id', column.router);

export default { router };
