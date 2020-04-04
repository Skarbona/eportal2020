import { useEffect, FC, memo, ReactElement } from 'react';
import { useSelector } from 'react-redux';

import { login, logout } from '../../store/app/thunk';
import { LocalStorage } from '../../models/local-storage';
import { useReduxDispatch } from '../../store/helpers';
import { RootState } from '../../store/store.interface';

let logoutTimer: number;

interface AuthSelector {
  accToken: string;
  accTokenExpiration: Date;
  refToken: string;
  refTokenExpiration: Date;
}

interface Auth {
  children: ReactElement;
}

export const AuthHOC: FC<Auth> = ({ children }) => {
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

  useEffect(() => {
    if (accToken && accTokenExpiration) {
      const remainingTime = accTokenExpiration.getTime() - new Date().getTime();
      logoutTimer = window.setTimeout(dispatch(logout), remainingTime);
    } else {
      window.clearTimeout(logoutTimer);
    }
  }, [accToken, accTokenExpiration, dispatch]);

  useEffect(() => {
    const userData = JSON.parse(
      window.localStorage.getItem(LocalStorage.UserDataAccessToken) || '{}',
    );

    if (userData?.accessToken && new Date(userData.accessTokenExpirationDate) > new Date()) {
      const { accessToken, accessTokenExpirationDate, userId } = userData;
      dispatch(
        login({
          userId,
          accessTokenData: { accessToken, accessTokenExpiration: accessTokenExpirationDate },
        }),
      );
    }
  }, [dispatch]);

  return children;
};

export default memo(AuthHOC);
