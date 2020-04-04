/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { AppThunk } from '../store.interface';
import { cleanAppData, setAccessTokenData, setRefreshTokenData } from './action';
import { cleanCategoriesData } from '../categories/action';
import { cleanGameData } from '../game/action';
import { cleanUserData } from '../user/action';
import { LocalStorage } from '../../models/local-storage';
import { Login } from './action.interface';

export const cleanAppDataHandler = (): AppThunk => async (dispatch) => {
  dispatch(cleanAppData());
  dispatch(cleanCategoriesData());
  dispatch(cleanGameData());
  dispatch(cleanUserData());
};

export const login = ({ userId, accessTokenData, refreshTokenData }: Login): AppThunk => async (
  dispatch,
) => {
  const { accessToken, accessTokenExpiration } = accessTokenData;
  const accessTokenExpirationDate = accessTokenExpiration
    ? new Date(accessTokenExpiration)
    : new Date(new Date().getTime() + 1000 * 60 * 60 * 3);
  dispatch(setAccessTokenData({ accessToken, accessTokenExpiration: accessTokenExpirationDate }));

  window.localStorage.setItem(
    LocalStorage.UserDataAccessToken,
    JSON.stringify({
      accessToken,
      userId,
      accessTokenExpirationDate: accessTokenExpirationDate.toISOString(),
    }),
  );

  if (refreshTokenData) {
    const { refreshToken, refreshTokenExpiration } = refreshTokenData;
    const refreshTokenExpirationDate = refreshTokenExpiration
      ? new Date(refreshTokenExpiration)
      : new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 14);
    dispatch(setRefreshTokenData({ refreshToken, refreshTokenExpirationDate }));
    window.localStorage.setItem(
      LocalStorage.UserDataRefreshToken,
      JSON.stringify({
        refreshToken,
        userId,
        refreshTokenExpirationDate: refreshTokenExpirationDate.toISOString(),
      }),
    );
  }
};

export const logout = (): AppThunk => async (dispatch) => {
  dispatch(cleanAppDataHandler());
  window.localStorage.removeItem(LocalStorage.UserDataAccessToken);
  window.localStorage.removeItem(LocalStorage.UserDataRefreshToken);
};
