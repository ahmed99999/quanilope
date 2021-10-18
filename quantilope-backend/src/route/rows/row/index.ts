import { Router, Request, Response, NextFunction } from 'express';
import { RowIdentifier, RowRequest, ApiResponse } from '../../../type';
import { ValidationError, CustomError, NotFoundError } from '../../../error';
import { validateId } from '../../../util';
import controller from '../../../controller';

const router = Router({ mergeParams: true });

const get = async (
  req: Request,
  res: Response<ApiResponse<RowIdentifier>>,
  next: NextFunction
) => {
  try {
    const { id: columnId } = req.params;

    if (!validateId(columnId))
      throw { name: 'ValidationError', message: columnId };

    const column = await controller.row.getRow(columnId);

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
  res: Response<ApiResponse<RowIdentifier>>,
  next: NextFunction
) => {
  try {
    const { id: columnId } = req.params;
    const params = req.body as RowRequest;

    if (!validateId(columnId))
      throw { name: 'ValidationError', message: columnId };

    const column = await controller.row.updateRow(columnId, params);

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
  res: Response<ApiResponse<RowIdentifier>>,
  next: NextFunction
) => {
  try {
    const { id: columnId } = req.params;

    if (!validateId(columnId))
      throw { name: 'ValidationError', message: columnId };

    const column = await controller.row.deleteRow(columnId);

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
