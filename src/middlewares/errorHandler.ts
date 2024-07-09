import { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const errorResponse = {
    statusCode: err.statusCode,
    message: err.message,
    errors: err.errors,
    success: err.success,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    data: err.data,
  };

  return res.status(err.statusCode).json(errorResponse);
};
