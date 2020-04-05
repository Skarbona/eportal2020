import { useEffect, FC, memo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import { login, logout, refreshTokens } from '../../store/app/thunk';
import { LocalStorage } from '../../models/local-storage';
import { useReduxDispatch } from '../../store/helpers';
import { RootState } from '../../store/store.interface';
import { Login } from '../../store/app/action.interface';

interface AuthSelector {
  accToken: string;
  accTokenExpiration: Date;
  refToken: string;
  refTokenExpiration: Date;
}

let accessTokenTimeout: number;
let refreshTokenTimeout: number;

export const AuthHOC: FC = () => {
  const [accTokenRemainingTime, setAccTokenRemainingTime] = useState<number>(null);
  const [refTokenRemainingTime, setRefTokenRemainingTime] = useState<number>(null);

  const dispatch = useReduxDispatch();
  const { accToken, accTokenExpiration, refToken, refTokenExpiration } = useSelector<
    RootState,
    AuthSelector
  >(({ app: { auth } }) => ({
    accToken: auth.accessToken,
    accTokenExpiration: auth.accessTokenExpiration,
    refToken: auth.refreshToken,
    refTokenExpiration: auth.refreshTokenExpiration,
  }));

  const logoutHandler = useCallback(() => dispatch(logout()), [dispatch]);
  const refreshTokenIntervalHandler = useCallback(
    () => setRefTokenRemainingTime((prevState) => prevState - 1000 * 10),
    [],
  );
  const accessTokenIntervalHandler = useCallback(() => {
    setAccTokenRemainingTime((prevState) => prevState - 1000 * 10);
  }, []);

  useEffect(() => {
    // Logout User on expired access tokens
    if (accToken && accTokenExpiration) {
      const remainingTime = accTokenExpiration.getTime() - new Date().getTime();
      accessTokenTimeout = window.setTimeout(logoutHandler, remainingTime);
    } else {
      window.clearTimeout(accessTokenTimeout);
    }
    return () => clearTimeout(accessTokenTimeout);
  }, [accToken, accTokenExpiration, logoutHandler]);

  useEffect(() => {
    // Logout User on expired refresh token
    if (refToken && refTokenExpiration) {
      const remainingTime = refTokenExpiration.getTime() - new Date().getTime();
      refreshTokenTimeout = window.setTimeout(logoutHandler, remainingTime);
    } else {
      window.clearTimeout(refreshTokenTimeout);
    }
    return () => window.clearTimeout(refreshTokenTimeout);
  }, [refTokenExpiration, refToken, logoutHandler]);

  useEffect(() => {
    // Set Interval for refresh Token
    let refreshTokenInterval: number;
    if (refTokenExpiration && refToken) {
      const remainingTime = refTokenExpiration.getTime() - new Date().getTime();
      setRefTokenRemainingTime(remainingTime);
      refreshTokenInterval = window.setInterval(refreshTokenIntervalHandler, 1000 * 20);
    }
    return () => window.clearInterval(refreshTokenInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refToken, refTokenExpiration]);

  useEffect(() => {
    // Set Interval for access Token
    let accessTokenInterval: number;
    if (accTokenExpiration && accToken) {
      const remainingTime = accTokenExpiration.getTime() - new Date().getTime();
      setAccTokenRemainingTime(remainingTime);
      accessTokenInterval = window.setInterval(accessTokenIntervalHandler, 1000 * 20);
    }
    return () => window.clearInterval(accessTokenInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accToken, accTokenExpiration]);

  useEffect(() => {
    // Refresh refresh and access Token
    if (refTokenRemainingTime && accTokenRemainingTime) {
      if (refTokenRemainingTime < 1000 * 60 && refTokenRemainingTime > 0) {
        dispatch(refreshTokens());
      }
      if (accTokenRemainingTime < 1000 * 60 && accTokenRemainingTime > 0) {
        dispatch(refreshTokens());
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refTokenRemainingTime, accTokenRemainingTime]);

  useEffect(() => {
    // Login if Access Token in LocalStorage
    const accessTokenData = JSON.parse(
      window.localStorage.getItem(LocalStorage.UserDataAccessToken) || '{}',
    );

    const refreshTokenData = JSON.parse(
      window.localStorage.getItem(LocalStorage.UserDataRefreshToken) || '{}',
    );

    if (
      refreshTokenData?.refreshToken &&
      accessTokenData?.accessToken &&
      new Date(refreshTokenData.refreshTokenExpirationDate) > new Date()
    ) {
      const { accessToken, accessTokenExpirationDate, userId } = accessTokenData;
      const { refreshToken, refreshTokenExpirationDate } = refreshTokenData;
      dispatch(
        login({
          userId,
          accessTokenData: { accessToken, accessTokenExpiration: accessTokenExpirationDate },
          refreshTokenData: { refreshToken, refreshTokenExpiration: refreshTokenExpirationDate },
        } as Login),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default memo(AuthHOC);
