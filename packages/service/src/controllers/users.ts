import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';

import HttpError from '../models/http-error';
import User, { UserDocument } from '../models/user';
import { UserType } from '../models/shared-interfaces/user';
import { TimeMode } from '../../../client/src/models/game-models';

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> => {
  const { name, email, password } = req.body;

  // TODO: Add validation!!!!!!!!

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
    type: UserType.User,
    password: hashedPassword,
    gameDefaults: {
      names: {
        she: '',
        he: '',
      },
      place: '',
      catsQuery: {
        catsInclude: [],
        catsExclude: [],
      },
      levels: {
        level1: 10,
        level2: 10,
        level3: 10,
      },
      time: {
        type: TimeMode.Single,
        value: [2],
      },
    },
  } as UserDocument);

  try {
    await createdUser.save();
  } catch (e) {
    return next(new HttpError('Cannot signup', 500));
  }

  // TODO: Add token
  res.status(201).json({ userId: createdUser.id, email: createdUser.email });
};

export const Login = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> => {
  // TODO: PlaceHolder
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> => {
  const { id } = req.params;
  // TODO: Protect by JWT

  let user;
  try {
    user = await User.findById(id).select('-password');
  } catch (e) {
    return next(new HttpError('Something went wrong', 500));
  }

  if (!user) {
    return next(new HttpError('User does not exist', 404));
  }

  res.status(200).json({ user: user.toObject({ getters: true }) });
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> => {
  // TODO: JWT protected THE SAME USER ONLY

  const { id } = req.params;
  const { gameDefaults, password } = req.body;

  let user;
  try {
    user = await User.findById(id).select('-password');
  } catch (e) {
    return next(new HttpError('User does not exist', 404));
  }

  if (user) {
    if (gameDefaults) user.gameDefaults = gameDefaults;
    if (password) user.password = password;

    try {
      await user.save();
    } catch (e) {
      return next(new HttpError('Something went wrong, could not update place', 500));
    }
  }

  res.json({ user: user.toObject({ getters: true }) });
};
