import { checkSchema } from 'express-validator';
import { Types } from 'mongoose';

import { PageRequestInterface } from '../models/shared-interfaces/page';

const author = {
  custom: {
    options: (author: string): boolean => {
      if (!author || !Types.ObjectId.isValid(author)) throw new Error('Author is not valid');
      return true;
    },
  },
};

const content = {
  custom: {
    options: (values: PageRequestInterface['content']): boolean => {
      if (!values?.title?.length || typeof values?.title !== 'string')
        throw new Error('Title cannot be empty');
      if (!values?.content?.length) throw new Error('Content cannot be empty');
      return true;
    },
  },
};

export const getPage = checkSchema({});
export const createPage = checkSchema({ content, author });
export const updatePage = checkSchema({ content });
