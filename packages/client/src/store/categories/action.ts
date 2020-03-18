import { ActionCreator } from 'redux';

import { CategoriesEnum } from './enum';
import * as I from './action.interface';

export const initFetchCategories: ActionCreator<I.InitFetchCategories> = () => ({
  type: CategoriesEnum.InitFetchCategories,
});

export const successFetchCategories: ActionCreator<I.SuccessFetchCategories> = categories => ({
  type: CategoriesEnum.SuccessFetchCategories,
  data: {
    categories,
  },
});

export const failFetchCategories: ActionCreator<I.FailFetchCategories> = error => ({
  type: CategoriesEnum.FailFetchCategories,
  data: {
    error,
  },
});
