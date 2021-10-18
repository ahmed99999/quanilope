import { CustomError } from './customError';

class NotFoundError extends CustomError {
  statusCode: number;
  constructor(element: string) {
    const message = `${element} was not found`;
    super(message, 404);
    this.statusCode = 404;
  }
}

export default NotFoundError;
export { NotFoundError };
