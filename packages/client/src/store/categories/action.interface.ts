import { CategoriesEnum } from './enum';
import { CategoryInterface } from './initialState.interface';
import { NetworkError } from '../../models/alerts';

interface ActionInterface {
  type: CategoriesEnum;
}

export interface CleanCategoriesAlerts extends ActionInterface {
  type: CategoriesEnum.CleanCategoriesAlerts;
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
    error: NetworkError;
  };
}

export interface CleanCategoriesData extends ActionInterface {
  type: CategoriesEnum.CleanCategoriesData;
}

export type CategoriesActions =
  | CleanCategoriesAlerts
  | InitFetchCategories
  | SuccessFetchCategories
  | FailFetchCategories
  | CleanCategoriesData;
