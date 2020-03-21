import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';

import HttpError from '../models/http-error';
import User, { UserInterface, UserType } from '../models/user';

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> => {
  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (e) {
    return next(new HttpError('Please try again later', 500));
  }

  if (existingUser) {
    return next(new HttpError('User exist already', 422));
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (e) {
    return next(new HttpError('Could not create user', 500));
  }

  const createdUser = new User({
    date: new Date(),
    email,
    name,
    type: UserType.Admin, // By default user type
    password: hashedPassword,
  } as UserInterface);

  try {
    await createdUser.save();
  } catch (e) {
    return next(new HttpError('Cannot signup', 500));
  }

  // TODO: Add token
  res.status(201).json({ userId: createdUser.id, email: createdUser.email });
};
