import { NextFunction, Request, Response } from 'express';
import sanitizeHtml from 'sanitize-html';

import { stringToSlug } from '../utils/slug';
import Page from '../models/page';
import HttpError from '../models/http-error';
import { logControllerError } from '../utils/error-logs';

export const getPage = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> => {
  const { slug } = req.params;

  try {
    const page = await Page.findOne({ slug });
    res.json({ page: page.toObject({ getters: true }) });
  } catch (e) {
    logControllerError('getPages', e);
    return next(new HttpError('Sorry we cannot find this page', 404));
  }
};

export const createPage = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> => {
  const { content, author } = req.body;

  const createdPage = new Page({
    date: new Date(),
    slug: stringToSlug(sanitizeHtml(content.title)),
    content: {
      title: sanitizeHtml(content.title),
      content: sanitizeHtml(content.content),
    },
    author,
  });

  try {
    const savedPage = await createdPage.save();
    res.status(201).json({ page: savedPage.toObject({ getters: true }) });
  } catch (e) {
    logControllerError('createPage', e);
    return next(new HttpError('Something went wrong, could not create page', 500));
  }
};

export const updatePage = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> => {
  const { slug } = req.params;
  const { content } = req.body;

  let page;
  try {
    page = await Page.findOne({ slug });
    if (!page) {
      throw new Error();
    }
  } catch (e) {
    logControllerError('updatePage', e);
    return next(new HttpError('Page does not exist', 404));
  }

  try {
    if (content.content) page.content.content = sanitizeHtml(content.content);
    if (content.title) page.content.title = sanitizeHtml(content.title);
    await page.save();
    res.json({ page: page.toObject({ getters: true }) });
  } catch (e) {
    logControllerError('updatePage', e);
    return next(new HttpError('Something went wrong, could not update page', 500));
  }
};
