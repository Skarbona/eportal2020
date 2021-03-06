import { CategoriesStateInterface } from '../../../store/categories/initialState.interface';
import { categoriesInitialState as initialState } from '../../../store/categories/initialState';
import categoriesReducer from '../../../store/categories/reducer';
import { CategoriesEnum } from '../../../store/categories/enum';
import * as I from '../../../store/categories/action.interface';
import { categoryResponseMock } from '../../../mocks/responses';
import { mainCategories } from '../../../constants/categoriesIds';
import { AlertTypes, NetworkError } from '../../../models/alerts';
import { setCatsMap } from '../../../utils/categories';

describe('Reducer: Categories', () => {
  let reducerState: CategoriesStateInterface;

  beforeEach(() => {
    reducerState = initialState;
  });

  it('should return initial state', () => {
    const state = categoriesReducer(initialState, {} as any);
    expect(state).toEqual(initialState);
  });

  it('should handle CleanCategoriesAlerts', () => {
    const action: I.CleanCategoriesAlerts = {
      type: CategoriesEnum.CleanCategoriesAlerts,
    };
    const state = categoriesReducer(initialState, action);
    const expectedState: CategoriesStateInterface = {
      ...initialState,
      alert: null,
      alertType: null,
      error: null,
    };
    expect(state).toEqual(expectedState);
  });

  it('should handle InitFetchCategories', () => {
    const action: I.InitFetchCategories = {
      type: CategoriesEnum.InitFetchCategories,
    };
    const state = categoriesReducer(initialState, action);
    const expectedState: CategoriesStateInterface = {
      ...initialState,
      loading: true,
      error: null,
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
        preferences: categories.find((cat) => cat.id === mainCategories.Preferences),
        gender: categories.find((cat) => cat.id === mainCategories.Gender),
        places: categories.find((cat) => cat.id === mainCategories.Place),
        levels: categories.find((cat) => cat.id === mainCategories.Levels),
      },
      allCatsMap: setCatsMap(categories),
    };
    expect(state).toEqual(expectedState);
  });

  it('should handle FailFetchCategories', () => {
    const error = { response: { status: 422 } } as NetworkError;
    const action: I.FailFetchCategories = {
      type: CategoriesEnum.FailFetchCategories,
      data: { error },
    };
    const state = categoriesReducer(initialState, action);
    const expectedState = {
      ...initialState,
      loading: false,
      error,
      alertType: AlertTypes.FetchingCategories,
    };
    expect(state).toEqual(expectedState);
  });

  it('should handle CleanCategoriesData', () => {
    const action: I.CleanCategoriesData = {
      type: CategoriesEnum.CleanCategoriesData,
    };
    const state = categoriesReducer(initialState, action);
    expect(state).toEqual(initialState);
  });
});
