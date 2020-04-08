import axios from 'axios';

import * as setUserDataThunk from '../../../store/user/thunks/setUserData';
import * as fetchUserDataThunk from '../../../store/user/thunks/fetchUserData';
import * as authorizeUserThunk from '../../../store/user/thunks/authorizeUser';
import * as userActions from '../../../store/user/action';

import { initialRootState } from '../../../store/store';
import { AuthorizationEndpoints } from '../../../models/endpoint-models';

describe('Thunk: User', () => {
  let dispatch: any;
  let initSetUserDataSpy: any;
  let successSetUserDataSpy: any;
  let failSetUserDataSpy: any;
  let initFetchUserDataSpy: any;
  let successFetchUserDataSpy: any;
  let failFetchUserDataSpy: any;
  let initAuthorizationSpy: any;
  let successAuthorizationSpy: any;
  let failAuthorizationSpy: any;

  beforeEach(() => {
    dispatch = jest.fn();
    initSetUserDataSpy = jest.spyOn(userActions, 'initSetUserData');
    successSetUserDataSpy = jest.spyOn(userActions, 'successSetUserData');
    failSetUserDataSpy = jest.spyOn(userActions, 'failSetUserData');
    initFetchUserDataSpy = jest.spyOn(userActions, 'initFetchUserData');
    successFetchUserDataSpy = jest.spyOn(userActions, 'successFetchUserData');
    failFetchUserDataSpy = jest.spyOn(userActions, 'failFetchUserData');
    initAuthorizationSpy = jest.spyOn(userActions, 'initAuthorization');
    successAuthorizationSpy = jest.spyOn(userActions, 'successAuthorization');
    failAuthorizationSpy = jest.spyOn(userActions, 'failAuthorization');
  });

  afterEach(() => {
    initSetUserDataSpy.mockClear();
    successSetUserDataSpy.mockClear();
    failSetUserDataSpy.mockClear();
    initFetchUserDataSpy.mockClear();
    successFetchUserDataSpy.mockClear();
    failFetchUserDataSpy.mockClear();
    initAuthorizationSpy.mockClear();
    successAuthorizationSpy.mockClear();
    failAuthorizationSpy.mockClear();
  });

  describe('setUserData thunk', () => {
    it('should call all required action in success path', async () => {
      jest.spyOn(axios, 'patch').mockImplementation(() => Promise.resolve({ data: { user: {} } }));
      await setUserDataThunk.setUserData()(dispatch, () => initialRootState, null);
      expect(initSetUserDataSpy).toHaveBeenCalled();
      expect(successSetUserDataSpy).toHaveBeenCalledWith({});
    });

    it('should call all required action in fail path', async () => {
      const error = new Error();
      jest.spyOn(axios, 'patch').mockImplementation(() => Promise.reject(error));
      await setUserDataThunk.setUserData()(dispatch, () => initialRootState, null);
      expect(initSetUserDataSpy).toHaveBeenCalled();
      expect(failSetUserDataSpy).toHaveBeenCalledWith(error);
    });
  });

  describe('fetchUserData thunk', () => {
    it('should call all required action in success path', async () => {
      jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: { user: {} } }));
      await fetchUserDataThunk.fetchUserData('TOKEN')(dispatch, () => initialRootState, null);
      expect(initFetchUserDataSpy).toHaveBeenCalled();
      expect(successFetchUserDataSpy).toHaveBeenCalledWith({});
    });

    it('should call all required action in fail path', async () => {
      const error = new Error();
      jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject(error));
      await fetchUserDataThunk.fetchUserData('TOKEN')(dispatch, () => initialRootState, null);
      expect(initFetchUserDataSpy).toHaveBeenCalled();
      expect(failFetchUserDataSpy).toHaveBeenCalledWith(error);
    });
  });

  describe('authorizeUser thunk', () => {
    it('should call all required action in success path', async () => {
      jest.spyOn(axios, 'post').mockImplementation(() =>
        Promise.resolve({
          data: {
            userData: { id: '' },
            accessTokenData: { accessToken: '' },
            refreshTokenData: { refreshToken: '' },
          },
        }),
      );
      await authorizeUserThunk.authorizeUser(AuthorizationEndpoints.Login, {
        password: '',
        email: '',
      })(dispatch, () => initialRootState, null);
      expect(initAuthorizationSpy).toHaveBeenCalled();
      expect(successAuthorizationSpy).toHaveBeenCalledWith({ userData: { id: '' } });
    });

    it('should call all required action in fail path', async () => {
      const error = new Error();
      jest.spyOn(axios, 'post').mockImplementation(() => Promise.reject(error));
      await authorizeUserThunk.authorizeUser(AuthorizationEndpoints.Login, {
        password: '',
        email: '',
      })(dispatch, () => initialRootState, null);
      expect(initAuthorizationSpy).toHaveBeenCalled();
      expect(failAuthorizationSpy).toHaveBeenCalledWith(error);
    });
  });
});
