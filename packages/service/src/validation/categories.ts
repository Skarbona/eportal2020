import { checkSchema } from 'express-validator';
import { Types } from 'mongoose';

import { CategoryRequestInterface } from '../models/category';

const categories = {
  custom: {
    options: (value: CategoryRequestInterface[]): boolean => {
      if (!value?.length || !Array.isArray(value)) {
        throw new Error('Provide valid body');
      }

      value.forEach((category) => {
        if (!category?.name || (category.name && typeof category.name !== 'string')) {
          throw new Error('Category name have to be a string and not empty');
        }
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        if (category.parent && !Types.ObjectId.isValid(category.parent as any)) {
          throw new Error('Category parent id have to be a valid objectId');
        }
      });
      return true;
    },
  },
};

const categoriesIds = {
  optional: { options: { nullable: true } },
  isString: {
    errorMessage: 'Please provide valid ids string',
  },
};

export const createCategories = checkSchema({ categories });
export const getCategories = checkSchema({ ids: categoriesIds });
