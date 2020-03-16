import { NextFunction, Request, Response } from 'express';
import HttpError from '../models/http-error';

const errorHandler = (err: HttpError, req: Request, res: Response, next: NextFunction): void => {
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.code || 500).json({ message: err.message || 'An unknown error occurred!' });
};

export default errorHandler;
