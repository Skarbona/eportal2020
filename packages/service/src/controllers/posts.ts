import { NextFunction, Request, Response } from 'express';

import Post from '../models/post';
import { PostRequestInterface, PostStatus } from '../models/shared-interfaces/post';
import HttpError from '../models/http-error';
import { stringToSlug } from '../utils/slug';

export const createPosts = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> => {
  const { posts } = req.body;
  // TODO: Add error handling
  // TODO: Protect this controller (JWT) and ONLY ADMIN
  if (!posts || posts.length === 0) {
    return next(new HttpError('Bad Request. Include valid Body', 400));
  }

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
    res.status(400).json({ msg: e });
  }
};

export const getPosts = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> => {
  const { cat_include_strict, cats_include, cats_exclude } = req.query;
  // TODO: Protect this endpoint
  try {
    let posts;
    if (req.query) {
      let options: {};
      if (cat_include_strict) {
        options = {
          $eq: cat_include_strict,
        };
      }

      if (cats_exclude) {
        options = {
          ...options,
          $nin: cats_exclude.split(','),
        };
      }

      if (cats_include) {
        options = {
          ...options,
          $nin: cats_include.split(','),
        };
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
