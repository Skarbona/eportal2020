import axios from 'axios';

import * as setUserDataThunk from '../../../store/user/thunks/setUserData';
import * as deleteUserThunk from '../../../store/user/thunks/deleteUser';
import * as fetchUserDataThunk from '../../../store/user/thunks/fetchUserData';
import * as authorizeUserThunk from '../../../store/user/thunks/authorizeUser';
import * as changePasswordThunk from '../../../store/user/thunks/changePassword';
import * as getResetPasswordLinkThunk from '../../../store/user/thunks/getResetPasswordLink';
import * as fetchUserPostsThunk from '../../../store/user/thunks/fetchUserPosts';
import * as logoutThunk from '../../../store/app/thunks/logout';
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
  let initDeleteUserSpy: any;
  let successDeleteUserSpy: any;
  let failDeleteUserSpy: any;
  let logoutSpy: any;
  let failGetResetPasswordLinkSpy: any;
  let successGetResetPasswordLinkSpy: any;
  let initGetResetPasswordLinkSpy: any;
  let successSetPasswordSpy: any;
  let fetchUserPostsStartSpy: any;
  let fetchUserPostsSuccessSpy: any;
  let fetchUserPostsFailSpy: any;

  beforeEach(() => {
    dispatch = jest.fn();
    fetchUserPostsStartSpy = jest.spyOn(userActions, 'fetchUserPostsStart');
    fetchUserPostsSuccessSpy = jest.spyOn(userActions, 'fetchUserPostsSuccess');
    fetchUserPostsFailSpy = jest.spyOn(userActions, 'fetchUserPostsFail');
    initSetUserDataSpy = jest.spyOn(userActions, 'initSetUserData');
    initGetResetPasswordLinkSpy = jest.spyOn(userActions, 'initGetResetPasswordLink');
    successGetResetPasswordLinkSpy = jest.spyOn(userActions, 'successGetResetPasswordLink');
    failGetResetPasswordLinkSpy = jest.spyOn(userActions, 'failGetResetPasswordLink');
    successSetPasswordSpy = jest.spyOn(userActions, 'successSetPassword');
    successSetUserDataSpy = jest.spyOn(userActions, 'successSetUserData');
    failSetUserDataSpy = jest.spyOn(userActions, 'failSetUserData');
    initFetchUserDataSpy = jest.spyOn(userActions, 'initFetchUserData');
    successFetchUserDataSpy = jest.spyOn(userActions, 'successFetchUserData');
    failFetchUserDataSpy = jest.spyOn(userActions, 'failFetchUserData');
    initAuthorizationSpy = jest.spyOn(userActions, 'initAuthorization');
    successAuthorizationSpy = jest.spyOn(userActions, 'successAuthorization');
    failAuthorizationSpy = jest.spyOn(userActions, 'failAuthorization');
    initDeleteUserSpy = jest.spyOn(userActions, 'initDeleteUser');
    successDeleteUserSpy = jest.spyOn(userActions, 'successDeleteUser');
    failDeleteUserSpy = jest.spyOn(userActions, 'failDeleteUser');
    logoutSpy = jest.spyOn(logoutThunk, 'logout');
  });

  afterEach(() => {
    fetchUserPostsStartSpy.mockClear();
    fetchUserPostsSuccessSpy.mockClear();
    fetchUserPostsFailSpy.mockClear();
    initSetUserDataSpy.mockClear();
    successSetUserDataSpy.mockClear();
    failSetUserDataSpy.mockClear();
    initFetchUserDataSpy.mockClear();
    successFetchUserDataSpy.mockClear();
    failFetchUserDataSpy.mockClear();
    initAuthorizationSpy.mockClear();
    successAuthorizationSpy.mockClear();
    failAuthorizationSpy.mockClear();
    initDeleteUserSpy.mockClear();
    successDeleteUserSpy.mockClear();
    failDeleteUserSpy.mockClear();
    logoutSpy.mockClear();
    failGetResetPasswordLinkSpy.mockClear();
    successGetResetPasswordLinkSpy.mockClear();
    initGetResetPasswordLinkSpy.mockClear();
    successSetPasswordSpy.mockClear();
  });

  describe('fetchUserPosts thunk', () => {
    it('should call all required action in success path', async () => {
      jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: {} }));
      await fetchUserPostsThunk.fetchUserPosts()(dispatch, () => initialRootState, null);
      expect(fetchUserPostsStartSpy).toHaveBeenCalled();
      expect(fetchUserPostsSuccessSpy).toHaveBeenCalled();
    });

    it('should call all required action in fail path', async () => {
      const error = new Error();
      jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject(error));
      await fetchUserPostsThunk.fetchUserPosts()(dispatch, () => initialRootState, null);
      expect(fetchUserPostsStartSpy).toHaveBeenCalled();
      expect(fetchUserPostsFailSpy).toHaveBeenCalled();
    });
  });

  describe('getResetPasswordLink thunk', () => {
    it('should call all required action in success path', async () => {
      jest.spyOn(axios, 'post').mockImplementation(() => Promise.resolve());
      await getResetPasswordLinkThunk.getResetPasswordLink('test@test.pl')(
        dispatch,
        () => initialRootState,
        null,
      );
      expect(initGetResetPasswordLinkSpy).toHaveBeenCalled();
      expect(successGetResetPasswordLinkSpy).toHaveBeenCalled();
    });

    it('should call all required action in fail path', async () => {
      const error = new Error();
      jest.spyOn(axios, 'post').mockImplementation(() => Promise.reject(error));
      await getResetPasswordLinkThunk.getResetPasswordLink('test@test.pl')(
        dispatch,
        () => initialRootState,
        null,
      );
      expect(initGetResetPasswordLinkSpy).toHaveBeenCalled();
      expect(failGetResetPasswordLinkSpy).toHaveBeenCalledWith(error);
    });
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

  describe('deleteUser thunk', () => {
    it('should call all required action in success path', async () => {
      jest.spyOn(axios, 'delete').mockImplementation(() => Promise.resolve({ msg: 'ok' }));
      await deleteUserThunk.deleteUser()(dispatch, () => initialRootState, null);
      expect(initDeleteUserSpy).toHaveBeenCalled();
      expect(successDeleteUserSpy).toHaveBeenCalled();
      expect(logoutSpy).toHaveBeenCalled();
    });

    it('should call all required action in fail path', async () => {
      const error = new Error();
      jest.spyOn(axios, 'delete').mockImplementation(() => Promise.reject(error));
      await deleteUserThunk.deleteUser()(dispatch, () => initialRootState, null);
      expect(initDeleteUserSpy).toHaveBeenCalled();
      expect(failDeleteUserSpy).toHaveBeenCalledWith(error);
      expect(logoutSpy).not.toHaveBeenCalled();
    });
  });

  describe('changePassword thunk', () => {
    it('should call all required action in success path', async () => {
      jest.spyOn(axios, 'patch').mockImplementation(() => Promise.resolve({ msg: 'ok' }));
      await changePasswordThunk.changePassword('NEW PASSWORD')(
        dispatch,
        () => initialRootState,
        null,
      );
      expect(initSetUserDataSpy).toHaveBeenCalled();
      expect(successSetPasswordSpy).toHaveBeenCalled();
      expect(logoutSpy).toHaveBeenCalled();
    });

    it('should call all required action in fail path', async () => {
      const error = new Error();
      jest.spyOn(axios, 'patch').mockImplementation(() => Promise.reject(error));
      await changePasswordThunk.changePassword('NEW PASSWORD')(
        dispatch,
        () => initialRootState,
        null,
      );
      expect(initSetUserDataSpy).toHaveBeenCalled();
      expect(failSetUserDataSpy).toHaveBeenCalledWith(error);
      expect(logoutSpy).not.toHaveBeenCalled();
    });
  });
});
