import axios from 'axios';

import * as fetchCategoriesThunk from '../../../store/categories/thunks/fetchCategories';
import { initialRootState } from '../../../store/store';
import * as categoriesActions from '../../../store/categories/action';

describe('Thunk: Categories', () => {
  let dispatch: any;
  let initFetchCategoriesSpy: any;
  let successFetchCategoriesSpy: any;
  let failFetchCategoriesSpy: any;

  beforeEach(() => {
    dispatch = jest.fn();
    initFetchCategoriesSpy = jest.spyOn(categoriesActions, 'initFetchCategories');
    successFetchCategoriesSpy = jest.spyOn(categoriesActions, 'successFetchCategories');
    failFetchCategoriesSpy = jest.spyOn(categoriesActions, 'failFetchCategories');
  });

  afterEach(() => {
    initFetchCategoriesSpy.mockClear();
    successFetchCategoriesSpy.mockClear();
    failFetchCategoriesSpy.mockClear();
  });

  describe('fetchCategories thunk', () => {
    it('should call all required action in success path', async () => {
      jest
        .spyOn(axios, 'get')
        .mockImplementation(() => Promise.resolve({ data: { categories: [] } }));
      await fetchCategoriesThunk.fetchCategories()(dispatch, () => initialRootState, null);
      expect(initFetchCategoriesSpy).toHaveBeenCalled();
      expect(successFetchCategoriesSpy).toHaveBeenCalledWith([]);
    });

    it('should call all required action in fail path', async () => {
      const error = new Error();
      jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject(error));
      await fetchCategoriesThunk.fetchCategories()(dispatch, () => initialRootState, null);
      expect(initFetchCategoriesSpy).toHaveBeenCalled();
      expect(failFetchCategoriesSpy).toHaveBeenCalledWith(error);
    });
  });
});
