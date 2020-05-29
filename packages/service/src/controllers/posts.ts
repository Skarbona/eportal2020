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

  const createdPosts = posts.map(({ content, categories, image, author }: PostRequestInterface) => {
    const post = new Post({
      date: new Date(),
      slug: stringToSlug(content.title),
      status: PostStatus.AwaitingForApproval,
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
    return next(new HttpError('Something went wrong, could not create posts', 500));
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
  // TODO: Add option for posts not in Waiting for Approval State
  const { catsIncludeStrict, catsInclude, catsExclude } = req.query;
  try {
    let posts;
    if (catsIncludeStrict || catsInclude || catsExclude) {
      let options: {};
      if (catsIncludeStrict) {
        options = { $eq: catsIncludeStrict };
      }

      if (catsExclude) {
        options = { ...options, $nin: (catsExclude as string).split(',') };
      }

      if (catsInclude) {
        options = { ...options, $in: (catsInclude as string).split(',') };
      }
      posts = await Post.find({
        categories: options,
      });
    } else {
      posts = await Post.find();
    }

    res.json({
      posts: posts.map((post) => post.toObject({ getters: true })),
    });
  } catch (e) {
    // TODO: Add errors logging
    console.log(e);
    return next(new HttpError('Something went wrong, could not find posts', 500));
  }
};
