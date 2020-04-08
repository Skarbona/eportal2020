import { checkSchema } from 'express-validator';
import { Types } from 'mongoose';
import { PostRequestInterface } from '../models/shared-interfaces/post';

const catsQueryRules = {
  optional: { options: { nullable: true } },
  custom: {
    options: (cats: string): boolean => {
      const hasInvalidIds = cats?.split(',').find((cat) => !Types.ObjectId.isValid(cat));
      if (hasInvalidIds) {
        throw new Error('Provided Ids are not valid');
      }
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
export const getPosts = checkSchema({
  catsIncludeStrict: catsQueryRules,
  catsExclude: catsQueryRules,
  catsInclude: catsQueryRules,
});
