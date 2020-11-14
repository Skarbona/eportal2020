import { NextFunction, Request, Response } from 'express';
import sanitizeHtml from 'sanitize-html';

import Post from '../models/post';
import { PostRequestInterface, PostStatus } from '../models/shared-interfaces/post';
import HttpError from '../models/http-error';
import { stringToSlug } from '../utils/slug';
import createEmailTransporter from '../utils/create-transport';
import { EMAIL_USER } from '../constants/envs';

export const savePosts = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> => {
  const {
    post: { id, content, categories, status },
  } = req.body;
  let post;
  try {
    post = await Post.findById(id);
    if (!post) {
      throw new Error();
    }
  } catch (e) {
    return next(new HttpError('Post does not exist', 404));
  }

  try {
    if (content?.content) post.content.content = sanitizeHtml(content.content);
    if (content?.title) post.content.title = sanitizeHtml(content.title);
    if (categories) post.categories = categories;
    if (status) post.status = status as PostStatus;
    await post.save();
    res.json({ post: post.toObject({ getters: true }) });
  } catch (e) {
    return next(new HttpError('Something went wrong, could not update post', 500));
  }
};

export const createPosts = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> => {
  const { posts } = req.body;

  const createdPosts = posts.map(
    ({ content, categories, image, author, meta }: PostRequestInterface) => {
      const post = new Post({
        date: new Date(),
        slug: stringToSlug(sanitizeHtml(content.title)),
        status: PostStatus.AwaitingForApproval,
        content: {
          title: sanitizeHtml(content.title),
          content: sanitizeHtml(content.content),
        },
        author,
        categories,
        image,
        meta: {
          newCategory: sanitizeHtml(meta?.newCategory) || '',
        },
      });
      post.slug = `${post.slug}/${post._id}`;
      return post;
    },
  );

  try {
    const posts = await Post.insertMany(createdPosts);
    res.status(201).json({ posts });
  } catch (e) {
    return next(new HttpError('Something went wrong, could not create posts', 500));
  }

  try {
    const transporter = createEmailTransporter();
    await transporter.sendMail({
      from: `<${EMAIL_USER}>`,
      to: EMAIL_USER,
      subject: 'New post added',
      text: `Please check waiting Room, new post was added`,
    });
  } catch (e) {
    return next();
  }
};

export const getPosts = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> => {
  const { catsIncludeStrict, catsInclude, catsExclude, status, author } = req.query;
  try {
    let posts;
    if (catsIncludeStrict || catsInclude || catsExclude || status || author) {
      let options: { categories?: {}; status?: {}; author?: {} };
      if (catsIncludeStrict) {
        options = { categories: { $eq: catsIncludeStrict } };
      }

      if (catsInclude) {
        options = {
          ...options,
          categories: { ...options?.categories, $in: (catsInclude as string).split(',') },
        };
      }

      if (catsExclude) {
        options = {
          ...options,
          categories: { ...options?.categories, $nin: (catsExclude as string).split(',') },
        };
      }

      if (author) {
        options = {
          ...options,
          author: { $eq: author },
        };
      }

      options = {
        ...options,
        status: { $in: status ? (status as PostStatus)?.split(',') : [PostStatus.Publish] },
      };

      posts = await Post.find({
        ...options,
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
