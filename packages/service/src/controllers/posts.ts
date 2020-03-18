import { NextFunction, Request, Response } from 'express';

import Post, { PostBasicInterface, PostStatus } from '../models/post';
import HttpError from '../models/http-error';
import { stringToSlug } from '../utils/slug';

// DONE: wp-json/wp/v2/posts?per_page=100&page=9&_embed
export const createPosts = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
  const { posts } = req.body;
  // TODO: Add error handling
  // TODO: Protect this controller (JWT) and ONLY ADMIN
  if (!posts || posts.length === 0) {
    return next(new HttpError('Bad Request. Include valid Body', 400));
  }

  // TODO: Check if this approach is ok
  const createdPosts = posts.map(({ content, categories, image, author }: PostBasicInterface) => {
    const post = new Post({
      date: new Date(),
      slug: stringToSlug(content.title),
      status: PostStatus.Publish, // TODO: Auto set
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

export const getPosts = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
  // TODO: Add filter rules
  try {
    const posts = await Post.find();
    res.json({ posts });
  } catch (e) {
    return next(new HttpError('Something went wrong, could not find posts', 500));
  }
};
