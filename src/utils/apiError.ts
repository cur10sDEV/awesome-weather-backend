interface IError {
  type: string;
  message: string;
}

interface IValidationError {
  path: string;
  message: string;
}

export class ApiError extends Error {
  statusCode: number;
  errors: IError[] | IValidationError[];
  success: boolean;
  message: string;
  stack?: string | undefined;
  data: null;

  constructor(
    statusCode: number = 500,
    message: string = "Something went wrong!",
    errors: IError[] = [],
    success = false,
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode || 500;
    this.errors = errors;
    this.message = message || "Internal Server Error!";
    this.success = success;
    this.data = null;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
