import { useEffect, FC, memo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
// import { useHistory } from 'react-router-dom';

import { logout } from '../../store/app/thunks/logout';
import { login } from '../../store/app/thunks/login';
import { refreshTokens } from '../../store/app/thunks/refreshTokens';
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
  // const history = useHistory(); // TODO: Check if need to history.push

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
    if (accToken && accTokenExpiration && accTokenRemainingTime > 0) {
      const remainingTime = accTokenExpiration.getTime() - new Date().getTime();
      accessTokenTimeout = window.setTimeout(logoutHandler, remainingTime);
    } else {
      window.clearTimeout(accessTokenTimeout);
    }
    return (): void => window.clearTimeout(accessTokenTimeout);
  }, [accToken, accTokenExpiration, logoutHandler, accTokenRemainingTime]);

  useEffect(() => {
    // Logout User on expired refresh token
    if (refToken && refTokenExpiration) {
      const remainingTime = refTokenExpiration.getTime() - new Date().getTime();
      refreshTokenTimeout = window.setTimeout(logoutHandler, remainingTime);
    } else {
      window.clearTimeout(refreshTokenTimeout);
    }
    return (): void => window.clearTimeout(refreshTokenTimeout);
  }, [refTokenExpiration, refToken, logoutHandler]);

  useEffect(() => {
    // Set Interval for refresh Token
    let refreshTokenInterval: number;
    if (refTokenExpiration && refToken) {
      const remainingTime = refTokenExpiration.getTime() - new Date().getTime();
      setRefTokenRemainingTime(remainingTime);
      refreshTokenInterval = window.setInterval(refreshTokenIntervalHandler, 1000 * 20);
    }
    return (): void => window.clearInterval(refreshTokenInterval);
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
    return (): void => window.clearInterval(accessTokenInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accToken, accTokenExpiration]);

  useEffect(() => {
    // Refresh Refresh Token
    if (refTokenRemainingTime > 0 && refTokenRemainingTime < 1000 * 60) {
      dispatch(refreshTokens());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refTokenRemainingTime]);

  useEffect(() => {
    // Refresh Access Token
    if (accTokenRemainingTime > 0 && accTokenRemainingTime < 1000 * 60) {
      dispatch(refreshTokens());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accToken, refToken, accTokenRemainingTime]);

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
    } else {
      dispatch(logout());
      // history.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default memo(AuthHOC);
