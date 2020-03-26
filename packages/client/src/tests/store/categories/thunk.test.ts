import axios from 'axios';

import * as categoriesThunk from '../../../store/categories/thunk';

import { initialRootState } from '../../../store/store';
import * as categoriesActions from '../../../store/categories/action';

jest.mock('../../../store/categories/action', () => ({
  initFetchCategories: jest.fn(),
  successFetchCategories: jest.fn(),
  failFetchCategories: jest.fn(),
}));

describe('Thunk: Categories', () => {
  let dispatch: any;

  beforeEach(() => {
    dispatch = jest.fn();
  });

  describe('fetchCategories thunk', () => {
    it('should call all required action in success path', async () => {
      jest
        .spyOn(axios, 'get')
        .mockImplementation(() => Promise.resolve({ data: { categories: [] } }));
      await categoriesThunk.fetchCategories()(dispatch, () => initialRootState, null);
      expect(categoriesActions.initFetchCategories).toHaveBeenCalled();
      expect(categoriesActions.successFetchCategories).toHaveBeenCalledWith([]);
    });

    it('should call all required action in fail path', async () => {
      const error = new Error();
      jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject(error));
      await categoriesThunk.fetchCategories()(dispatch, () => initialRootState, null);
      expect(categoriesActions.initFetchCategories).toHaveBeenCalled();
      expect(categoriesActions.failFetchCategories).toHaveBeenCalledWith(error);
    });
  });
});
