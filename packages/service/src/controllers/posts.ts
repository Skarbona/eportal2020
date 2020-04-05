import { NextFunction, Request, Response } from 'express';

import Post from '../models/post';
import { PostRequestInterface, PostStatus } from '../models/shared-interfaces/post';
import HttpError from '../models/http-error';
import { stringToSlug } from '../utils/slug';
import { validationResult } from 'express-validator';

export const createPosts = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const { posts } = req.body;
  // TODO: ONLY ADMIN

  const createdPosts = posts.map(({ content, categories, image, author }: PostRequestInterface) => {
    const post = new Post({
      date: new Date(),
      slug: stringToSlug(content.title),
      status: PostStatus.Publish, // TODO: Auto set depends on situation
      content: {
        title: content.title,
        content: content.content,
      },
      author,
      categories,
      image,
    });
    post.slug = `${post.slug}/${post._id}`;
    return post;
  });

  try {
    const posts = await Post.insertMany(createdPosts);
    res.status(201).json({ posts });
  } catch (e) {
    return next(new HttpError('Something went wrong, could not find posts', 500));
  }
};

export const getPosts = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { catsIncludeStrict, catsInclude, catsExclude } = req.query;
  try {
    let posts;
    if (req.query) {
      let options: {};
      if (catsIncludeStrict) {
        options = { $eq: catsIncludeStrict };
      }

      if (catsExclude) {
        options = { ...options, $nin: catsExclude.split(',') };
      }

      if (catsInclude) {
        options = { ...options, $nin: catsInclude.split(',') };
      }
      posts = await Post.find({
        categories: options,
      });
    }

    if (!req.query) {
      posts = await Post.find().populate('categories');
    }

    res.json({ posts: posts.map((post) => post.toObject({ getters: true })) });
  } catch (e) {
    // TODO: Add errors logging
    console.log(e);
    return next(new HttpError('Something went wrong, could not find posts', 500));
  }
};
