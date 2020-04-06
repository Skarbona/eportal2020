import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

import HttpError from '../models/http-error';

config();

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {
    const split = req.headers.authorization.split(' ');
    const accessToken = split[1];
    if (!accessToken || split[0] !== 'Bearer') {
      throw new Error();
    }
    const decodedToken = jwt.verify(
      accessToken,
      process.env.JWT_ACCESS_TOKEN,
    ) as Request['userData'];
    req.userData = { userId: decodedToken.userId, email: decodedToken.email };
    next();
  } catch (e) {
    return next(new HttpError('Invalid Access Token', 401));
  }
};

export const authRefreshMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {
    const split = req.headers.authorization.split(' ');
    const refreshToken = split[2];
    if (!refreshToken || split[0] !== 'Bearer') {
      throw new Error();
    }
    const decodedToken = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_TOKEN,
    ) as Request['userData'];
    req.userData = { userId: decodedToken.userId, email: decodedToken.email };
    next();
  } catch (e) {
    return next(new HttpError('Invalid Refresh Token', 401));
  }
};
