import { Router, Request, Response, NextFunction } from 'express';
import multer from '../../../service/multer';
import controller from '../../../controller';
import { NotFoundError, CustomError, ValidationError } from '../../../error';
import { validateId } from '../../../util';
import { ColumnRequest } from '../../../type';

const router = Router({ mergeParams: true });

router.route('/:id').post(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const columnId = req.params.id;
      if (!validateId(columnId))
        throw { name: 'ValidationError', message: columnId };
      const column = await controller.column.getColumn(columnId);
      if (!column)
        throw { name: 'NotFoundError', message: `column : ${columnId}` };
    } catch (error: any) {
      if (error.name === 'NotFoundError') {
        next(new NotFoundError(error.message));
      }

      if (error.name === 'ValidationError') {
        next(new ValidationError(error.message));
      }

      next(new CustomError('something went wrong, try again', 500));
    }
  },
  multer.single('image'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id: columnId } = req.params;

      const params = req.body as ColumnRequest;
      params.image = req.file?.path;
      const column = await controller.column.updateColumn(columnId, params);

      res.status(201).send({ data: column });
    } catch (error: any) {
      console.log(error);

      next(new CustomError('something went wrong, try again', 500));
    }
  }
);
export default { router };
export { router };
