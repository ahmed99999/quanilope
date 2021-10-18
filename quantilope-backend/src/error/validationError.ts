import { CustomError } from './customError';

class ValidationError extends CustomError {
  statusCode: number;
  constructor(element: string) {
    const message = `ValidationError : ${element} is not valid type`;
    super(message, 400);
    this.statusCode = 400;
  }
}

export default ValidationError;
export { ValidationError };
