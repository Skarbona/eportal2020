import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

import HttpError from '../models/http-error';

config();

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      throw new Error();
    }
    const decodedToken = jwt.verify(token, process.env.JWT_ACCESS_TOKEN) as Request['userData'];
    req.userData = { userId: decodedToken.userId, email: decodedToken.email };
    next();
  } catch (e) {
    return next(new HttpError('Invalid Token', 401));
  }
};
