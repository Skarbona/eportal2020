import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

import { stringToSlug } from '../utils/slug';
import Page from '../models/page';
import HttpError from '../models/http-error';

export const getPage = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { slug } = req.params;

  try {
    const page = await Page.findOne({ slug });
    res.json({ page: page.toObject({ getters: true }) });
  } catch (e) {
    return next(new HttpError('Sorry we cannot find this page', 404));
  }
};

export const createPage = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { content, author } = req.body;

  const createdPage = new Page({
    date: new Date(),
    slug: stringToSlug(content.title),
    content: {
      title: content.title,
      content: content.content,
    },
    author,
  });

  try {
    const savedPage = await createdPage.save();
    res.status(201).json({ page: savedPage.toObject({ getters: true }) });
  } catch (e) {
    return next(new HttpError('Something went wrong, could not create page', 500));
  }
};

export const updatePage = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { slug } = req.params;
  const { content } = req.body;

  let page;
  try {
    page = await Page.findOne({ slug });
    if (!page) {
      throw new Error();
    }
  } catch (e) {
    return next(new HttpError('Page does not exist', 404));
  }

  try {
    if (content.content) page.content.content = content.content;
    if (content.title) page.content.title = content.title;
    await page.save();
    res.json({ page: page.toObject({ getters: true }) });
  } catch (e) {
    return next(new HttpError('Something went wrong, could not update page', 500));
  }
};
