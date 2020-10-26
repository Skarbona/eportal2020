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
  const { catsIncludeStrict, catsInclude, catsExclude, status } = req.query;
  try {
    let posts;
    if (catsIncludeStrict || catsInclude || catsExclude || status) {
      let options: { categories?: {}; status?: {} };
      if (catsIncludeStrict) {
        options = { categories: { $eq: catsIncludeStrict } };
      }

      if (catsInclude) {
        options = {
          ...options,
          categories: { ...options.categories, $in: (catsInclude as string).split(',') },
        };
      }

      if (catsExclude) {
        options = {
          ...options,
          categories: { ...options.categories, $nin: (catsExclude as string).split(',') },
        };
      }

      posts = await Post.find({
        ...options,
        status: { $eq: status ? (status as PostStatus) : PostStatus.Publish },
      }).populate('author', 'name');
    } else {
      posts = await Post.find().populate('author', 'name');
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
