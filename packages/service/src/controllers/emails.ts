import { NextFunction, Request, Response } from 'express';

import { EMAIL_USER } from '../constants/envs';
import createEmailTransporter from '../utils/create-transport';
import HttpError from '../models/http-error';
import { logControllerError } from '../utils/error-logs';

export const contactForm = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> => {
  try {
    const { email, message } = req.body;

    const transporter = createEmailTransporter();

    await transporter.sendMail({
      from: `<${EMAIL_USER}>`,
      to: EMAIL_USER,
      replyTo: email,
      subject: 'New email from contact Form!',
      text: message,
    });
    return res.status(202).json({ msg: 'Message was send!' });
  } catch (e) {
    logControllerError('sendEmail', e);
    return next(new HttpError('Something went wrong, could not sent an email', 500));
  }
};
