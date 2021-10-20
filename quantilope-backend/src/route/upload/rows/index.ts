import { Router, Request, Response, NextFunction } from 'express';
import multer from '../../../service/multer';
import controller from '../../../controller';
import { NotFoundError, CustomError, ValidationError } from '../../../error';
import { validateId } from '../../../util';
import { RowRequest } from '../../../type';

const router = Router({ mergeParams: true });

router.route('/:id').post(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const rowId = req.params.id;
      if (!validateId(rowId)) throw { name: 'ValidationError', message: rowId };
      const row = await controller.row.getRow(rowId);
      if (!row) throw { name: 'NotFoundError', message: `row : ${rowId}` };

      next();
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
      const { id: rowId } = req.params;

      const params = req.body as RowRequest;
      params.image = req.file?.path;
      const row = await controller.row.updateRow(rowId, params);

      res.status(201).send({ data: row });
    } catch (error: any) {
      console.log(error);

      next(new CustomError('something went wrong, try again', 500));
    }
  }
);

export default { router };
export { router };
