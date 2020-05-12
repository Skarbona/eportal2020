/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { LocalStorage } from '../../../models/local-storage';
import { setAccessTokenData, setRefreshTokenData } from '../action';
import { AppThunk } from '../../store.interface';
import { Login } from '../action.interface';

export const login = ({ userId, accessTokenData, refreshTokenData }: Login): AppThunk => (
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
      : new Date(new Date().getTime() + 1000 * 60 * 60 * 24);
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
