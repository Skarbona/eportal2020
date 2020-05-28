import axios from 'axios';

import * as logoutThunk from '../../../store/app/thunks/logout';
import * as loginThunk from '../../../store/app/thunks/login';
import * as refreshThunk from '../../../store/app/thunks/refreshTokens';
import * as cleanThunk from '../../../store/app/thunks/cleanAppDataHandler';
import * as cleanAlertsThunk from '../../../store/app/thunks/cleanAlerts';

import { initialRootState } from '../../../store/store';
import * as appActions from '../../../store/app/action';
import * as categoriesActions from '../../../store/categories/action';
import * as gameActions from '../../../store/game/action';
import * as userActions from '../../../store/user/action';
import * as pagesActions from '../../../store/pages/action';

describe('Thunk: App', () => {
  let dispatch: any;

  beforeEach(() => {
    dispatch = jest.fn();
  });

  describe('cleanAlerts thunk', () => {
    let cleanAppAlertsSpy: any;
    let cleanCategoriesAlertsSpy: any;
    let cleanGameAlertsSpy: any;
    let cleanUserAlertsSpy: any;
    let cleanPagesAlertsSpy: any;
    let cleanAlertsSpy: any;

    beforeEach(() => {
      cleanAppAlertsSpy = jest.spyOn(appActions, 'cleanAppAlerts');
      cleanCategoriesAlertsSpy = jest.spyOn(categoriesActions, 'cleanCategoriesAlerts');
      cleanGameAlertsSpy = jest.spyOn(gameActions, 'cleanGameAlerts');
      cleanUserAlertsSpy = jest.spyOn(userActions, 'cleanUserAlerts');
      cleanPagesAlertsSpy = jest.spyOn(pagesActions, 'cleanPagesAlerts');
      cleanAlertsSpy = jest.spyOn(cleanAlertsThunk, 'cleanAlertsHandler');
    });

    afterEach(() => {
      cleanAppAlertsSpy.mockClear();
      cleanCategoriesAlertsSpy.mockClear();
      cleanGameAlertsSpy.mockClear();
      cleanUserAlertsSpy.mockClear();
      cleanPagesAlertsSpy.mockClear();
      cleanAlertsSpy.mockClear();
    });

    it('should call all required actions', () => {
      cleanAlertsThunk.cleanAlertsHandler()(dispatch, () => initialRootState, null);
      expect(cleanAppAlertsSpy).toHaveBeenCalledTimes(1);
      expect(cleanCategoriesAlertsSpy).toHaveBeenCalledTimes(1);
      expect(cleanGameAlertsSpy).toHaveBeenCalledTimes(1);
      expect(cleanUserAlertsSpy).toHaveBeenCalledTimes(1);
      expect(cleanPagesAlertsSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('cleanAppDataHandler thunk', () => {
    let cleanAppDataSpy: any;
    let cleanCategoriesDataSpy: any;
    let cleanGameDataSpy: any;
    let cleanUserDataSpy: any;
    let cleanAlertsSpy: any;

    beforeEach(() => {
      cleanAppDataSpy = jest.spyOn(appActions, 'cleanAppData');
      cleanCategoriesDataSpy = jest.spyOn(categoriesActions, 'cleanCategoriesData');
      cleanGameDataSpy = jest.spyOn(gameActions, 'cleanGameData');
      cleanUserDataSpy = jest.spyOn(userActions, 'cleanUserData');
      cleanAlertsSpy = jest.spyOn(cleanAlertsThunk, 'cleanAlertsHandler');
    });

    afterEach(() => {
      cleanAppDataSpy.mockClear();
      cleanCategoriesDataSpy.mockClear();
      cleanGameDataSpy.mockClear();
      cleanUserDataSpy.mockClear();
      cleanAlertsSpy.mockClear();
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
    let clearItemsLocalStorageSpy: any;
    let finishAuthorizationSpy: any;

    beforeEach(() => {
      cleanAppDataHandler = jest.spyOn(cleanThunk, 'cleanAppDataHandler');
      finishAuthorizationSpy = jest.spyOn(appActions, 'finishAuthorization');
      clearItemsLocalStorageSpy = jest.spyOn(window.localStorage.__proto__, 'clear');
    });

    afterEach(() => {
      finishAuthorizationSpy.mockClear();

      cleanAppDataHandler.mockClear();
      clearItemsLocalStorageSpy.mockClear();
    });

    it('should call all required actions', () => {
      logoutThunk.logout()(dispatch, () => initialRootState, null);
      expect(clearItemsLocalStorageSpy).toHaveBeenCalledTimes(1);
      expect(cleanAppDataHandler).toHaveBeenCalled();
      expect(finishAuthorizationSpy).toHaveBeenCalled();
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
