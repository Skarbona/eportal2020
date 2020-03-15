import { NextFunction, Request, Response } from 'express';

import Post from '../models/post';

// DONE: wp-json/wp/v2/posts?per_page=100&page=3&_embed
export const createPosts = async (req: Request, res: Response, next: NextFunction) => {
  const { posts } = req.body;
  // TODO: Add error handling
  // TODO: Protect this controller (JWT) and ONLY ADMIN
  if (!posts || posts.length === 0) {
    return next();
  }

  // TODO: Don't allow any in body map.
  // TODO: Check if this approach is ok
  const createdPosts = posts.map((post: any) => {
    // TODO: After uploading or images, create right model
    return {
      date: new Date(post.date), // TODO: Here create new Date() after migration
      slug: post.slug, // TODO: Auto generate slug
      status: post.status, // TODO: Auto set
      content: {
        title: post.title,
        content: post.content,
      },
      author: '5e6e45dfdfec533ce0ebc6ee', // TODO: Auto Set Author in the future
      categories: post.categories,
      image: post.image
    };
  });

  try {
    await Post.insertMany(createdPosts);
    res.status(201).json({ msg: 'success!' });
  } catch (e) {
    res.status(400).json({ msg: e });
  }
};
