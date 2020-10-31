import { checkSchema } from 'express-validator';
import { Types } from 'mongoose';

import { PostRequestInterface } from '../models/shared-interfaces/post';
import { PostStatus } from '../models/shared-interfaces/post';

const catsQueryRules = {
  optional: { options: { nullable: true } },
  custom: {
    options: (cats: string): boolean => {
      const catsIds = cats?.split(',');
      const hasInvalidIds = catsIds.every((cat) => Types.ObjectId.isValid(cat));

      if (!hasInvalidIds) {
        throw new Error('Provided Ids are not valid');
      }
      return true;
    },
  },
};

const post = {
  custom: {
    options: (post: PostRequestInterface): boolean => {
      if (!post) {
        throw new Error('Not valid schema for post');
      }
      const { content, categories, image, id, status } = post;
      if (content?.title && (typeof content.title !== 'string' || content.title?.length < 4))
        throw new Error('Not valid title');
      if (content?.content && (typeof content.content !== 'string' || content.content?.length < 4))
        throw new Error('Not valid content');
      if (!id) throw new Error('Id is required');
      if (categories && !Array.isArray(categories)) throw new Error('Not valid id schema');
      if (categories && categories.find((cat) => !Types.ObjectId.isValid(cat)))
        throw new Error('Not valid ids');
      if (image && typeof image !== 'string') throw new Error('Not valid image');
      if (
        status &&
        ![PostStatus.Publish, PostStatus.AwaitingForApproval, PostStatus.Archival].includes(status)
      )
        throw new Error('Not valid status');
      return true;
    },
  },
};

const posts = {
  custom: {
    options: (posts: PostRequestInterface): boolean => {
      if (!posts || !Array.isArray(posts) || posts.length < 1) {
        throw new Error('Not valid schema for posts');
      }
      const everyPostIsValid = posts.every(({ content, categories, image, author }) => {
        if (!content?.title || !content.content) return false;
        if (!categories || !Array.isArray(categories)) return false;
        if (categories.find((cat) => !Types.ObjectId.isValid(cat))) return false;
        if (image && typeof image !== 'string') return false;
        if (!author || !Types.ObjectId.isValid(author)) return false;
        return true;
      });

      if (!everyPostIsValid) {
        throw new Error('Not all posts are valid');
      }
      return true;
    },
  },
};

export const createPosts = checkSchema({ posts });
export const savePosts = checkSchema({ post });
export const getPosts = checkSchema({
  catsIncludeStrict: catsQueryRules,
  catsExclude: catsQueryRules,
  catsInclude: catsQueryRules,
  author: catsQueryRules,
});
