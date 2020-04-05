/* eslint-disable @typescript-eslint/explicit-function-return-type */

import axios from 'axios';
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
    dispatch(
      setRefreshTokenData({ refreshToken, refreshTokenExpiration: refreshTokenExpirationDate }),
    );

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

export const refreshTokens = (): AppThunk => async (dispatch, getState) => {
  try {
    const { app, user } = getState();
    const tokens = app.auth;
    const userId = user.userData.id;

    console.log('ZROBILEM REFRESH CALLA!!');

    const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_API}/token/refresh`, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken} ${tokens.refreshToken}`,
      },
    });
    const { accessToken, refreshToken } = data;

    dispatch(
      login({ userId, accessTokenData: { accessToken }, refreshTokenData: { refreshToken } }),
    );
  } catch (e) {
    // TODO: Display small error
  }
};
