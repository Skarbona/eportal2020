import { mainCategories } from '../../constants/categoriesIds';
import { CategoriesActions } from './action.interface';
import { CategoriesEnum } from './enum';
import { categoriesInitialState } from './initialState';
import { CategoriesStateInterface } from './initialState.interface';
import { ErrorTypes } from '../../models/errors';

const categoriesReducer = (
  state = categoriesInitialState,
  action: CategoriesActions,
): CategoriesStateInterface => {
  switch (action.type) {
    case CategoriesEnum.InitFetchCategories:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CategoriesEnum.SuccessFetchCategories: {
      const { categories } = action.data;
      return {
        ...state,
        loading: false,
        categories: {
          preferences: categories.find((cat) => cat.id === mainCategories.Preferences),
          gender: categories.find((cat) => cat.id === mainCategories.Gender),
          places: categories.find((cat) => cat.id === mainCategories.Place),
          levels: categories.find((cat) => cat.id === mainCategories.Levels),
        },
      };
    }
    case CategoriesEnum.FailFetchCategories: {
      const { error } = action.data;
      let errorType = ErrorTypes.ServerError;
      const errorStatus = error.response?.status;
      if (!errorStatus || errorStatus >= 500) {
        errorType = ErrorTypes.ServerError;
      } else if (errorStatus === 401) {
        errorType = ErrorTypes.UnAuthorized;
      } else {
        errorType = ErrorTypes.FetchingCategories;
      }
      return {
        ...state,
        loading: false,
        error,
        errorType,
      };
    }
    case CategoriesEnum.CleanCategoriesData:
      return categoriesInitialState;
    default:
      return state;
  }
};

export default categoriesReducer;
