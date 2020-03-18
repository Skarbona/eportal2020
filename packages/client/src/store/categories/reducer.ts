import { categoriesInitialState } from './initialState';
import { CategoriesStateInterface } from './initialState.interface';
import { CategoriesActions } from './action.interface';
import { CategoriesEnum } from './enum';

const formReducer = (state = categoriesInitialState, action: CategoriesActions): CategoriesStateInterface => {
  switch (action.type) {
    case CategoriesEnum.InitFetchCategories:
      return {
        ...state,
        loading: true,
      };
    case CategoriesEnum.SuccessFetchCategories:
      return {
        ...state,
        loading: false,
        categories: action.data.categories,
      };
    case CategoriesEnum.FailFetchCategories:
      return {
        ...state,
        loading: false,
        categories: [],
        error: action.data.error,
      };
    default:
      return state;
  }
};

export default formReducer;
