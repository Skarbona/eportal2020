import { NextFunction, Request, Response } from 'express';

export const contactForm = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> => {
  throw new Error();
};
