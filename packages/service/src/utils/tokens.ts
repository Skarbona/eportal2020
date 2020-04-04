import jwt from 'jsonwebtoken';
import { UserDocument } from '../models/user';

export const createTokens = (user: UserDocument): { accessToken: string; refreshToken: string } => {
  const accessToken = jwt.sign(
    {
      userId: user.id,
      email: user.email,
    },
    process.env.JWT_ACCESS_TOKEN,
    { expiresIn: '3h' },
  );

  const refreshToken = jwt.sign(
    {
      userId: user.id,
      email: user.email,
    },
    process.env.JWT_REFRESH_TOKEN,
    { expiresIn: '14d' },
  );

  return {
    accessToken,
    refreshToken,
  };
};
