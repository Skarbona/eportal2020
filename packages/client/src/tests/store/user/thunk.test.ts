import axios from 'axios';

import * as userThunk from '../../../store/user/thunk';

import { initialRootState } from '../../../store/store';
import * as userActions from '../../../store/user/action';

jest.mock('../../../store/user/action', () => ({
  initSetUserData: jest.fn(),
  successSetUserData: jest.fn(),
  failSetUserData: jest.fn(),
  initFetchUserData: jest.fn(),
  successFetchUserData: jest.fn(),
  failFetchUserData: jest.fn(),
}));

describe('Thunk: User', () => {
  let dispatch: any;

  beforeEach(() => {
    dispatch = jest.fn();
  });

  describe('setUserData thunk', () => {
    it('should call all required action in success path', async () => {
      jest.spyOn(axios, 'patch').mockImplementation(() => Promise.resolve({ data: { user: {} } }));
      await userThunk.setUserData()(dispatch, () => initialRootState, null);
      expect(userActions.initSetUserData).toHaveBeenCalled();
      expect(userActions.successSetUserData).toHaveBeenCalledWith({});
    });

    it('should call all required action in fail path', async () => {
      const error = new Error();
      jest.spyOn(axios, 'patch').mockImplementation(() => Promise.reject(error));
      await userThunk.setUserData()(dispatch, () => initialRootState, null);
      expect(userActions.initSetUserData).toHaveBeenCalled();
      expect(userActions.failSetUserData).toHaveBeenCalledWith(error);
    });
  });

  describe('fetchUserData thunk', () => {
    it('should call all required action in success path', async () => {
      jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: { user: {} } }));
      await userThunk.fetchUserData()(dispatch, () => initialRootState, null);
      expect(userActions.initFetchUserData).toHaveBeenCalled();
      expect(userActions.successFetchUserData).toHaveBeenCalledWith({});
    });

    it('should call all required action in fail path', async () => {
      const error = new Error();
      jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject(error));
      await userThunk.fetchUserData()(dispatch, () => initialRootState, null);
      expect(userActions.initFetchUserData).toHaveBeenCalled();
      expect(userActions.failFetchUserData).toHaveBeenCalledWith(error);
    });
  });
});
