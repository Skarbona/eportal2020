import { ActionCreator } from 'redux';

import * as I from './action.interface';
import { CategoriesEnum } from './enum';

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
