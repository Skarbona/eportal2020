import { mainCategories } from '../../constants/categoriesIds';
import { CategoriesActions } from './action.interface';
import { CategoriesEnum } from './enum';
import { categoriesInitialState } from './initialState';
import { CategoriesStateInterface } from './initialState.interface';
import { AlertTypes } from '../../models/alerts';
import { setCatsMap } from '../../utils/categories';

const categoriesReducer = (
  state = categoriesInitialState,
  action: CategoriesActions,
): CategoriesStateInterface => {
  switch (action.type) {
    case CategoriesEnum.CleanCategoriesAlerts: {
      return {
        ...state,
        error: null,
        alert: null,
        alertType: null,
      };
    }
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
        allCatsMap: setCatsMap(categories),
      };
    }
    case CategoriesEnum.FailFetchCategories: {
      const { error } = action.data;
      let alertType = AlertTypes.ServerError;
      const errorStatus = error.response?.status;
      if (!errorStatus || errorStatus >= 500) {
        alertType = AlertTypes.ServerError;
      } else if (errorStatus === 401) {
        alertType = AlertTypes.UnAuthorized;
      } else {
        alertType = AlertTypes.FetchingCategories;
      }
      return {
        ...state,
        loading: false,
        error,
        alertType,
      };
    }
    case CategoriesEnum.CleanCategoriesData:
      return categoriesInitialState;
    default:
      return state;
  }
};

export default categoriesReducer;
