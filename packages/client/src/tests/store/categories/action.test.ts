import * as I from '../../../store/categories/action.interface';
import { CategoriesEnum } from '../../../store/categories/enum';
import * as A from '../../../store/categories/action';
import { categoryResponseMock } from '../../../mocks/responses';

describe('Actions: Categories', () => {
  it('should create cleanCategoriesAlerts action', () => {
    const expectedAction: I.CleanCategoriesAlerts = {
      type: CategoriesEnum.CleanCategoriesAlerts,
    };

    const action = A.cleanCategoriesAlerts();
    expect(action).toEqual(expectedAction);
  });

  it('should create initFetchCategories action', () => {
    const expectedAction: I.InitFetchCategories = {
      type: CategoriesEnum.InitFetchCategories,
    };

    const action = A.initFetchCategories();
    expect(action).toEqual(expectedAction);
  });

  it('should create successFetchCategories action', () => {
    const categories = [categoryResponseMock()];
    const expectedAction: I.SuccessFetchCategories = {
      type: CategoriesEnum.SuccessFetchCategories,
      data: {
        categories,
      },
    };
    const action = A.successFetchCategories(categories);
    expect(action).toEqual(expectedAction);
  });

  it('should create failFetchCategories action', () => {
    const error = new Error();
    const expectedAction: I.FailFetchCategories = {
      type: CategoriesEnum.FailFetchCategories,
      data: {
        error,
      },
    };
    const action = A.failFetchCategories(error);
    expect(action).toEqual(expectedAction);
  });

  it('should create cleanCategoriesData action', () => {
    const expectedAction: I.CleanCategoriesData = {
      type: CategoriesEnum.CleanCategoriesData,
    };

    const action = A.cleanCategoriesData();
    expect(action).toEqual(expectedAction);
  });
});
