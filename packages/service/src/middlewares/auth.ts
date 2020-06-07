import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import HttpError from '../models/http-error';
import { UserType } from '../models/shared-interfaces/user';
import { JWT_ACCESS_TOKEN, JWT_REFRESH_TOKEN } from '../constants/envs';

interface DecodedToken {
  userId: string;
  email: string;
  type: UserType;
  iat: number;
  exp: number;
}

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
    const decodedToken = jwt.verify(accessToken, JWT_ACCESS_TOKEN) as DecodedToken;

    if (new Date().getTime() > decodedToken.exp * 1000) {
      throw new Error(
        `Access Token expired for user ${decodedToken.email} with id: ${decodedToken.userId}`,
      );
    }
    req.userData = {
      userId: decodedToken.userId,
      email: decodedToken.email,
      type: decodedToken.type,
    };
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
    const decodedToken = jwt.verify(refreshToken, JWT_REFRESH_TOKEN) as DecodedToken;

    if (new Date().getTime() > decodedToken.exp * 1000) {
      throw new Error(
        `Access Token expired for user ${decodedToken.email} with id: ${decodedToken.userId}`,
      );
    }

    req.userData = {
      userId: decodedToken.userId,
      email: decodedToken.email,
      type: decodedToken.type,
    };
    next();
  } catch (e) {
    return next(new HttpError('Invalid Refresh Token', 401));
  }
};

export const isAdminMiddleWare = (req: Request, res: Response, next: NextFunction): void => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {
    const split = req.headers.authorization.split(' ');
    const accessToken = split[1];
    if (!accessToken || split[0] !== 'Bearer') {
      throw new Error();
    }
    const decodedToken = jwt.verify(accessToken, JWT_ACCESS_TOKEN) as DecodedToken;

    if (decodedToken.type !== UserType.Admin) {
      throw new Error();
    }

    next();
  } catch (e) {
    return next(new HttpError('You do not have permissions', 401));
  }
};
