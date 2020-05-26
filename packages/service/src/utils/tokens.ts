import jwt from 'jsonwebtoken';
import { UserDocument } from '../models/user';

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
    process.env.JWT_ACCESS_TOKEN,
    { expiresIn: '3h' },
  );

  const refreshToken = jwt.sign(
    {
      userId: user.id,
      email: user.email,
      type: user.type,
    },
    process.env.JWT_REFRESH_TOKEN,
    { expiresIn: '1d' },
  );

  const resetToken = jwt.sign(
    {
      userId: user.id,
      email: user.email,
      type: user.type,
    },
    process.env.JWT_ACCESS_TOKEN,
    { expiresIn: '1h' },
  );

  return {
    accessToken,
    refreshToken,
    resetToken,
  };
};
