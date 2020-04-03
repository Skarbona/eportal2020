import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

import HttpError from '../models/http-error';
import User, { UserDocument } from '../models/user';
import { UserType } from '../models/shared-interfaces/user';
import { TimeMode } from '../../../client/src/models/game-models';

config();

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> => {
  const { userName, email, password } = req.body;

  // TODO: Add validation!!!!!!!!

  let existingUser;
  try {
    existingUser = await User.findOne({ $or: [{ email }, { name: userName }] });
  } catch (e) {
    console.log(e);
    return next(new HttpError('Please try again later', 500));
  }

  if (existingUser) {
    return next(new HttpError('User with this email or userName exist already', 422));
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
    name: userName,
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

  let token;
  let user;
  try {
    await createdUser.save();
    user = await await User.findById(createdUser.id).select('-password');
    token = jwt.sign(
      {
        userId: createdUser.id,
        email: createdUser.id,
      },
      process.env.JWT_TOKEN,
      { expiresIn: '1h' },
    );
  } catch (e) {
    return next(new HttpError('Cannot sign up', 500));
  }

  res.status(201).json({ userData: user.toObject({ getters: true }), token });
};

export const Login = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> => {
  const { email, password } = req.body;
  let user;

  try {
    user = await User.findOne({ email });
    if (!user) {
      throw new Error('User does not exist');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('Not valid password');
    }
  } catch (e) {
    return next(new HttpError('Could not identify user', 401));
  }

  let token;
  try {
    token = jwt.sign(
      {
        userId: user.id,
        email: user.id,
      },
      process.env.JWT_TOKEN,
      { expiresIn: '1h' },
    );
  } catch (e) {
    return next(new HttpError('Cannot sign up', 500));
  }

  const userData = user.toObject({ getters: true });
  delete userData.password;

  res.json({ userData, token });
};

export const getUserData = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> => {
  const { userId } = req.userData;
  // const { userId } = req.params;
  // TODO: ADD ADMIN POSSIBILITY TO FETCH USER DATA
  let user;
  try {
    user = await User.findById(userId).select('-password');
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
  const { userId } = req.userData;
  const { gameDefaults, password } = req.body;
  // TODO: ADD ADMIN POSSIBILITY TO UPDATE USER DATA
  let user;
  try {
    user = await User.findById(userId).select('-password');
  } catch (e) {
    return next(new HttpError('User does not exist', 404));
  }

  if (user) {
    if (gameDefaults) user.gameDefaults = gameDefaults;
    if (password) user.password = password;

    try {
      await user.save();
    } catch (e) {
      return next(new HttpError('Something went wrong, could not update user', 500));
    }
  }

  res.json({ user: user.toObject({ getters: true }) });
};
