import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import sanitizeHtml from 'sanitize-html';

import HttpError from '../models/http-error';
import User, { UserDocument } from '../models/user';
import { UserType } from '../models/shared-interfaces/user';
import { TimeMode } from '../../../client/src/models/game-models';
import { createTokens } from '../utils/tokens';
import { resetPasswordTemplate } from '../templetes/emails/reset-password';
import { LanguageApp } from '../models/languages';
import { EMAIL_USER } from '../constants/envs';
import createEmailTransporter from '../utils/create-transport';
import { logControllerError } from '../utils/error-logs';

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> => {
  const { userName, email: passedEmail, password } = req.body;
  const userType = req.userData?.type;
  let email;
  let existingUser;
  try {
    email = (passedEmail as string)?.toLocaleLowerCase?.();
    existingUser = await User.findOne({ $or: [{ email }, { name: userName }] });
  } catch (e) {
    logControllerError('signUp', e);
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
    name: sanitizeHtml(userName),
    type:
      req.route.path === '/signup-admin' && userType === UserType.Admin
        ? UserType.Admin
        : UserType.User,
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
    const user = await await User.findById(createdUser.id).select('-password');
    const { accessToken, refreshToken } = createTokens(createdUser);
    res.status(201).json({ userData: user.toObject({ getters: true }), accessToken, refreshToken });
  } catch (e) {
    logControllerError('signUp', e);
    return next(new HttpError('Cannot sign up:' + e, 500));
  }
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
    logControllerError('Login', e);
    return next(new HttpError('Could not identify user' + e, 401));
  }

  try {
    const { accessToken, refreshToken } = createTokens(user);
    const userData = user.toObject({ getters: true });
    delete userData.password;

    res.json({ userData, accessToken, refreshToken });
  } catch (e) {
    logControllerError('Login', e);
    return next(new HttpError('Cannot sign up', 500));
  }
};

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> => {
  const { email } = req.body;
  let user;

  try {
    user = await User.findOne({ email });
    if (!user) {
      throw new Error('User does not exist');
    }
  } catch (e) {
    logControllerError('resetPassword', e);
    return next(new HttpError('User does not exist', 401));
  }

  try {
    const transporter = createEmailTransporter();

    const { resetToken } = createTokens(user);

    const { subject, text } = resetPasswordTemplate(resetToken, LanguageApp);

    await transporter.sendMail({
      from: `<${EMAIL_USER}>`,
      to: email,
      subject,
      text,
    });

    res.status(202).json({ msg: 'Check your email with new Password' });
  } catch (e) {
    logControllerError('resetPassword', e);
    return next(new HttpError('Something went wrong, could not reset password', 500));
  }
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
    logControllerError('getUserData', e);
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
    user = await User.findById(userId);
    if (!user) {
      throw new Error();
    }
  } catch (e) {
    logControllerError('updateUser', e);
    return next(new HttpError('User does not exist', 404));
  }

  try {
    if (gameDefaults) user.gameDefaults = gameDefaults;
    if (password) user.password = await bcrypt.hash(password, 12);
    await user.save();
    const userData = user.toObject({ getters: true });
    delete userData.password;
    res.json({ user: userData });
  } catch (e) {
    logControllerError('updateUser', e);
    return next(new HttpError('Something went wrong, could not update user', 500));
  }
};

export const saveFavourites = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> => {
  const { postId } = req.params;
  const { userId } = req.userData;

  let user;
  try {
    user = await User.findById(userId);
    if (!user) {
      throw new Error();
    }
  } catch (e) {
    logControllerError('saveFavourites', e);
    return next(new HttpError('User does not exist', 404));
  }

  try {
    if (postId) {
      const hasPost = user.favouritesPosts.find((id) => id.toString() === postId);
      if (!hasPost) {
        user.favouritesPosts = Array.from(new Set([...user.favouritesPosts, postId]));
      } else {
        user.favouritesPosts = user.favouritesPosts.filter((id) => id.toString() !== postId);
      }
    }
    await user.save();
    const userData = user.toObject({ getters: true });
    delete userData.password;
    res.json({ user: userData });
  } catch (e) {
    logControllerError('saveFavourites', e);
    return next(new HttpError('Something went wrong, could not save favourites', 500));
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> => {
  const { userId, email } = req.userData;
  // const { userId } = req.params;
  // TODO: ADD ADMIN POSSIBILITY TO DELETE USER
  let user;
  try {
    user = await User.findById(userId);
    if (!user) {
      return next(new HttpError('User does not exist', 404));
    }
    await user.remove();
    res.status(200).json({ msg: 'User Removed' });
  } catch (e) {
    logControllerError('deleteUser', e);
    return next(new HttpError('Something went wrong', 500));
  }

  try {
    const transporter = createEmailTransporter();
    await transporter.sendMail({
      from: `<${EMAIL_USER}>`,
      to: EMAIL_USER,
      subject: 'Account removed',
      text: `Account of ${email} was removed`,
    });
  } catch (e) {
    logControllerError('deleteUser', e);
    return next();
  }
};
