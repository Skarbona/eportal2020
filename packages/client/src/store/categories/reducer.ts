import { mainCategories } from '../../constants/categoriesIds';
import { CategoriesActions } from './action.interface';
import { CategoriesEnum } from './enum';
import { categoriesInitialState } from './initialState';
import { CategoriesStateInterface } from './initialState.interface';

const categoriesReducer = (
  state = categoriesInitialState,
  action: CategoriesActions,
): CategoriesStateInterface => {
  switch (action.type) {
    case CategoriesEnum.InitFetchCategories:
      return {
        ...state,
        loading: true,
      };
    case CategoriesEnum.SuccessFetchCategories: {
      const { categories } = action.data;
      return {
        ...state,
        loading: false,
        categories: {
          preferences: categories.find(cat => cat.id === mainCategories.Preferences),
          gender: categories.find(cat => cat.id === mainCategories.Gender),
          places: categories.find(cat => cat.id === mainCategories.Place),
          levels: categories.find(cat => cat.id === mainCategories.Levels),
        },
      };
    }
    case CategoriesEnum.FailFetchCategories:
      return {
        ...state,
        loading: false,
        categories: {
          preferences: null,
          gender: null,
          places: null,
          levels: null,
        },
        error: action.data.error,
      };
    default:
      return state;
  }
};

export default categoriesReducer;
