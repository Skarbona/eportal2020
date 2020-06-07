import jwt from 'jsonwebtoken';
import { UserDocument } from '../models/user';

import { JWT_ACCESS_TOKEN, JWT_REFRESH_TOKEN } from '../constants/envs';

interface Tokens {
  accessToken?: string;
  refreshToken?: string;
  resetToken?: string;
}

export const createTokens = (user: UserDocument): Tokens => {
  const accessToken = jwt.sign(
    {
      userId: user.id,
      email: user.email,
      type: user.type,
    },
    JWT_ACCESS_TOKEN,
    { expiresIn: '3h' },
  );

  const refreshToken = jwt.sign(
    {
      userId: user.id,
      email: user.email,
      type: user.type,
    },
    JWT_REFRESH_TOKEN,
    { expiresIn: '1d' },
  );

  const resetToken = jwt.sign(
    {
      userId: user.id,
      email: user.email,
      type: user.type,
    },
    JWT_ACCESS_TOKEN,
    { expiresIn: '1h' },
  );

  return {
    accessToken,
    refreshToken,
    resetToken,
  };
};
