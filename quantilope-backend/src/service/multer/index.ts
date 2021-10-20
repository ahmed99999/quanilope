import { Request } from 'express';
import multer from 'multer';
import { MAX_FILE_SIZE } from '../../constant';
import { CustomError } from '../../error';

const fileFilter = (req: Request, file: Express.Multer.File, cb: Function) => {
  if (!file.mimetype.startsWith('image')) {
    cb(null, false);
    throw new CustomError('type must be Image', 400);
  } else cb(null, true);
};

const storage = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb) {
    try {
      const folderName = req.baseUrl.replace('/upload/', '');
      cb(null, `./uploads/${folderName}`);
    } catch (error) {
      console.error(error);
    }
  },
  filename: function (req: Request, file: Express.Multer.File, cb) {
    try {
      const imageName = `${req.params.id}.${file.mimetype.replace(
        'image/',
        ''
      )}`;
      cb(null, imageName);
    } catch (error) {
      console.error(error);
    }
  },
});

export default multer({
  storage,
  fileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
});
