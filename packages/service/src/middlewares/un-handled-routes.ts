import { NextFunction, Request, Response } from 'express';
import HttpError from '../models/http-error';

/* eslint-disable-next-line */
const unHandledRoutes = (req: Request, res: Response, next: NextFunction): Error => {
  throw new HttpError('Could not find this route.', 404);
};

export default unHandledRoutes;
