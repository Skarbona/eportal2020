import { NextFunction, Request, Response } from 'express';

import HttpError from '../models/http-error';
import { createTokens } from '../utils/tokens';
import User from '../models/user';
import { logControllerError } from '../utils/error-logs';

export const refresh = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> => {
  const { userId } = req.userData;

  try {
    const user = await User.findById(userId);
    const { accessToken, refreshToken } = createTokens(user);
    res.json({ accessToken, refreshToken });
  } catch (e) {
    logControllerError('getToken', e);
    return next(new HttpError('Cannot refresh token', 500));
  }
};
