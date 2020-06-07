import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import HttpError from '../models/http-error';

const checkValidation = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError(JSON.stringify(errors.array()), 400));
  }
  next();
};

export default checkValidation;
