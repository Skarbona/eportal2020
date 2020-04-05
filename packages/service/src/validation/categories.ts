import { checkSchema } from 'express-validator';
import { Types } from 'mongoose';

import { CategoryRequestInterface } from '../models/category';

const categories = {
  custom: {
    options: (value: CategoryRequestInterface[]) => {
      if (!value?.length || !Array.isArray(value)) {
        throw new Error('Provide valid body');
      }

      value.forEach((category) => {
        if (!category?.name || (category.name && typeof category.name !== 'string')) {
          throw new Error('Category name have to be a string and not empty');
        }
        if (category.parent && !Types.ObjectId.isValid(category.parent as any)) {
          throw new Error('Category parent id have to be a string');
        }
      });
      return true;
    },
  },
};

const categoriesIds = {
  isString: {
    errorMessage: 'Please provide valid ids string',
  },
};

export const createCategories = checkSchema({ categories });
export const getCategories = checkSchema({ ids: categoriesIds });
