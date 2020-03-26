import { CategoriesStateInterface } from '../../../store/categories/initialState.interface';
import { categoriesInitialState as initialState } from '../../../store/categories/initialState';
import categoriesReducer from '../../../store/categories/reducer';
import { CategoriesEnum } from '../../../store/categories/enum';
import * as I from '../../../store/categories/action.interface';
import { categoryResponseMock } from '../../../mocks/responses';
import { mainCategories } from '../../../constants/categoriesIds';

describe('Reducer: Categories', () => {
  let reducerState: CategoriesStateInterface;

  beforeEach(() => {
    reducerState = initialState;
  });

  it('should return initial state', () => {
    const state = categoriesReducer(initialState, {} as any);
    expect(state).toEqual(initialState);
  });

  it('should handle InitFetchCategories', () => {
    const action: I.InitFetchCategories = {
      type: CategoriesEnum.InitFetchCategories,
    };
    const state = categoriesReducer(initialState, action);
    const expectedState = {
      ...initialState,
      loading: true,
    };
    expect(state).toEqual(expectedState);
  });

  it('should handle SuccessFetchCategories', () => {
    const categories = [categoryResponseMock()];
    const action: I.SuccessFetchCategories = {
      type: CategoriesEnum.SuccessFetchCategories,
      data: {
        categories,
      },
    };
    const state = categoriesReducer(initialState, action);
    const expectedState = {
      ...initialState,
      loading: false,
      categories: {
        preferences: categories.find(cat => cat.id === mainCategories.Preferences),
        gender: categories.find(cat => cat.id === mainCategories.Gender),
        places: categories.find(cat => cat.id === mainCategories.Place),
        levels: categories.find(cat => cat.id === mainCategories.Levels),
      },
    };
    expect(state).toEqual(expectedState);
  });

  it('should handle FailFetchCategories', () => {
    const error = new Error();
    const action: I.FailFetchCategories = {
      type: CategoriesEnum.FailFetchCategories,
      data: {
        error,
      },
    };
    const state = categoriesReducer(initialState, action);
    const expectedState = {
      ...initialState,
      loading: false,
      error,
    };
    expect(state).toEqual(expectedState);
  });
});
