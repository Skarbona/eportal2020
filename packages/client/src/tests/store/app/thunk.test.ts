import axios from 'axios';

import * as logoutThunk from '../../../store/app/thunks/logout';
import * as loginThunk from '../../../store/app/thunks/login';
import * as refreshThunk from '../../../store/app/thunks/refreshTokens';
import * as cleanThunk from '../../../store/app/thunks/cleanAppDataHandler';

import { initialRootState } from '../../../store/store';
import * as appActions from '../../../store/app/action';
import * as categoriesActions from '../../../store/categories/action';
import * as gameActions from '../../../store/game/action';
import * as userActions from '../../../store/user/action';

describe('Thunk: App', () => {
  let dispatch: any;

  beforeEach(() => {
    dispatch = jest.fn();
  });

  describe('cleanAppDataHandler thunk', () => {
    let cleanAppDataSpy: any;
    let cleanCategoriesDataSpy: any;
    let cleanGameDataSpy: any;
    let cleanUserDataSpy: any;

    beforeEach(() => {
      cleanAppDataSpy = jest.spyOn(appActions, 'cleanAppData');
      cleanCategoriesDataSpy = jest.spyOn(categoriesActions, 'cleanCategoriesData');
      cleanGameDataSpy = jest.spyOn(gameActions, 'cleanGameData');
      cleanUserDataSpy = jest.spyOn(userActions, 'cleanUserData');
    });

    afterEach(() => {
      cleanAppDataSpy.mockClear();
      cleanCategoriesDataSpy.mockClear();
      cleanGameDataSpy.mockClear();
      cleanUserDataSpy.mockClear();
    });

    it('should call all required actions', () => {
      cleanThunk.cleanAppDataHandler()(dispatch, () => initialRootState, null);
      expect(cleanAppDataSpy).toHaveBeenCalledTimes(1);
      expect(cleanCategoriesDataSpy).toHaveBeenCalledTimes(1);
      expect(cleanGameDataSpy).toHaveBeenCalledTimes(1);
      expect(cleanUserDataSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('login thunk', () => {
    let setRefreshTokenDataSpy: any;
    let setAccessTokenDataSpy: any;
    let setItemLocalStorageSpy: any;

    beforeEach(() => {
      setRefreshTokenDataSpy = jest.spyOn(appActions, 'setRefreshTokenData');
      setAccessTokenDataSpy = jest.spyOn(appActions, 'setAccessTokenData');
      setItemLocalStorageSpy = jest.spyOn(window.localStorage.__proto__, 'setItem');
    });

    afterEach(() => {
      setRefreshTokenDataSpy.mockClear();
      setAccessTokenDataSpy.mockClear();
      setItemLocalStorageSpy.mockClear();
    });

    it('should call all required actions if accessTokenData provided', () => {
      const payload = { userId: 'ID', accessTokenData: { accessToken: 'TOKEN' } };
      loginThunk.login(payload)(dispatch, () => initialRootState, null);
      expect(setAccessTokenDataSpy).toHaveBeenCalled();
      expect(setItemLocalStorageSpy).toHaveBeenCalledTimes(1);
      expect(setRefreshTokenDataSpy).not.toHaveBeenCalled();
    });

    it('should call all required actions if refreshTokenData provided', () => {
      const payload = {
        userId: 'ID',
        accessTokenData: { accessToken: 'TOKEN' },
        refreshTokenData: { refreshToken: 'TOKEN' },
      };
      loginThunk.login(payload)(dispatch, () => initialRootState, null);
      expect(setAccessTokenDataSpy).toHaveBeenCalled();
      expect(setRefreshTokenDataSpy).toHaveBeenCalled();
      expect(setItemLocalStorageSpy).toHaveBeenCalledTimes(2);
    });
  });

  describe('logout thunk', () => {
    let cleanAppDataHandler: any;
    let removeItemLocalStorageSpy: any;

    beforeEach(() => {
      cleanAppDataHandler = jest.spyOn(cleanThunk, 'cleanAppDataHandler');
      removeItemLocalStorageSpy = jest.spyOn(window.localStorage.__proto__, 'removeItem');
    });

    afterEach(() => {
      cleanAppDataHandler.mockClear();
      removeItemLocalStorageSpy.mockClear();
    });

    it('should call all required actions', () => {
      logoutThunk.logout()(dispatch, () => initialRootState, null);
      expect(removeItemLocalStorageSpy).toHaveBeenCalledTimes(3);
      expect(cleanAppDataHandler).toHaveBeenCalled();
    });
  });

  describe('refreshTokens thunk', () => {
    let initRefreshTokensSpy: any;
    let failRefreshTokensSpy: any;
    let loginSpy: any;

    beforeEach(() => {
      initRefreshTokensSpy = jest.spyOn(appActions, 'initRefreshTokens');
      failRefreshTokensSpy = jest.spyOn(appActions, 'failRefreshTokens');
      loginSpy = jest.spyOn(loginThunk, 'login');
    });

    afterEach(() => {
      initRefreshTokensSpy.mockClear();
      failRefreshTokensSpy.mockClear();
      loginSpy.mockClear();
    });

    it('should call all required actions on success path', async () => {
      jest
        .spyOn(axios, 'get')
        .mockImplementation(() => Promise.resolve({ data: { accessToken: {}, refreshToken: {} } }));
      await refreshThunk.refreshTokens()(dispatch, () => initialRootState, null);
      expect(initRefreshTokensSpy).toHaveBeenCalled();
      expect(loginSpy).toHaveBeenCalled();
    });

    it('should call all required actions on error path', async () => {
      jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject(new Error()));
      await refreshThunk.refreshTokens()(dispatch, () => initialRootState, null);
      expect(initRefreshTokensSpy).toHaveBeenCalled();
      expect(failRefreshTokensSpy).toHaveBeenCalled();
    });
  });
});
