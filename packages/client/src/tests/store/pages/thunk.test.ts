import axios from 'axios';

import * as getPageDataThunk from '../../../store/pages/thunks/getPageData';
import * as cleanThunk from '../../../store/app/thunks/cleanAppDataHandler';

import { initialRootState } from '../../../store/store';
import * as pagesActions from '../../../store/pages/action';

describe('Thunk: App', () => {
  let dispatch: any;

  beforeEach(() => {
    dispatch = jest.fn();
  });

  describe('getPageData thunk', () => {
    let initGetPageSpy: any;
    let successGetPageSpy: any;
    let failGetPageSpy: any;

    beforeEach(() => {
      initGetPageSpy = jest.spyOn(pagesActions, 'initGetPage');
      successGetPageSpy = jest.spyOn(pagesActions, 'successGetPage');
      failGetPageSpy = jest.spyOn(pagesActions, 'failGetPage');
    });

    afterEach(() => {
      initGetPageSpy.mockClear();
      successGetPageSpy.mockClear();
      failGetPageSpy.mockClear();
    });

    it('should call all required actions on success path', async () => {
      jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: { page: {} } }));
      await getPageDataThunk.getPageData('home')(dispatch, () => initialRootState, null);
      expect(initGetPageSpy).toHaveBeenCalled();
      expect(successGetPageSpy).toHaveBeenCalled();
    });

    it('should call all required actions on error path', async () => {
      jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject(new Error()));
      await getPageDataThunk.getPageData('home')(dispatch, () => initialRootState, null);
      expect(initGetPageSpy).toHaveBeenCalled();
      expect(failGetPageSpy).toHaveBeenCalled();
    });
  });
});
