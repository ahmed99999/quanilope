import { Router, Request, Response, NextFunction } from 'express';
import { RowIdentifier, ApiResponse, RowRequest } from '../../type';
import controller from '../../controller';
import { ValidationError, CustomError } from '../../error';
import row from './row';

const router = Router();

const get = async (req: Request, res: Response<ApiResponse>) => {
  try {
    const columns = await controller.row.getAllRows();
    res.status(200).send({ data: columns });
  } catch (error) {
    console.error(error);
    res.status(500).send({ data: error });
  }
};

const post = async (
  req: Request,
  res: Response<ApiResponse<RowIdentifier>>,
  next: NextFunction
) => {
  try {
    const params = req.body as RowRequest;
    const column = await controller.row.createRow(params);
    res.status(201).send({ data: column });
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      next(new ValidationError(error.message));
    }
    next(new CustomError('something went wrong, try again', 500));
  }
};

router.get('/', get).post('/', post).use('/:id', row.router);

export default { router };
