import { CategoriesEnum } from './enum';
import { CategoryInterface } from './initialState.interface';

interface ActionInterface {
  type: CategoriesEnum;
}

export interface InitFetchCategories extends ActionInterface {
  type: CategoriesEnum.InitFetchCategories;
}

export interface SuccessFetchCategories extends ActionInterface {
  type: CategoriesEnum.SuccessFetchCategories;
  data: {
    categories: CategoryInterface[];
  };
}

export interface FailFetchCategories extends ActionInterface {
  type: CategoriesEnum.FailFetchCategories;
  data: {
    error: Error;
  };
}

export interface CleanCategoriesData extends ActionInterface {
  type: CategoriesEnum.CleanCategoriesData;
}

export type CategoriesActions =
  | InitFetchCategories
  | SuccessFetchCategories
  | FailFetchCategories
  | CleanCategoriesData;
