import { Router, Request, Response, NextFunction } from 'express';
import { ColumnIdentifier, ColumnRequest, ApiResponse } from '../../../type';
import controller from '../../../controller';
import { NotFoundError, ValidationError, CustomError } from '../../../error';
import { validateId } from '../../../util';

const router = Router({ mergeParams: true });

const get = async (
  req: Request,
  res: Response<ApiResponse<ColumnIdentifier>>,
  next: NextFunction
) => {
  try {
    const { id: columnId } = req.params;

    if (!validateId(columnId))
      throw { name: 'ValidationError', message: columnId };

    const column = await controller.column.getColumn(columnId);

    if (!column) throw { name: 'NotFoundError', message: columnId };

    res.status(200).send({ data: column });
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      next(new ValidationError(error.message));
    }

    if (error.name === 'NotFoundError') {
      next(new NotFoundError(error.message));
    }

    next(new CustomError('something went wrong, try again', 500));
  }
};

const put = async (
  req: Request,
  res: Response<ApiResponse<ColumnIdentifier>>,
  next: NextFunction
) => {
  try {
    const { id: columnId } = req.params;
    const params = req.body as ColumnRequest;

    if (!validateId(columnId))
      throw { name: 'ValidationError', message: columnId };

    const column = await controller.column.updateColumn(columnId, params);

    if (!column) throw { name: 'NotFoundError', message: columnId };

    res.status(200).send({ data: column });
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      next(new ValidationError(error.message));
    }

    if (error.name === 'NotFoundError') {
      next(new NotFoundError(error.message));
    }

    next(new CustomError('something went wrong, try again', 500));
  }
};

const remove = async (
  req: Request,
  res: Response<ApiResponse<ColumnIdentifier>>,
  next: NextFunction
) => {
  try {
    const { id: columnId } = req.params;

    if (!validateId(columnId))
      throw { name: 'ValidationError', message: columnId };

    const column = await controller.column.deleteColumn(columnId);

    if (!column) throw { name: 'NotFoundError', message: columnId };

    res.status(200).send({ data: column });
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      next(new ValidationError(error.message));
    }

    if (error.name === 'NotFoundError') {
      next(new NotFoundError(error.message));
    }

    next(new CustomError('something went wrong, try again', 500));
  }
};

router.route('/').get(get).put(put).delete(remove);

export default { router };
