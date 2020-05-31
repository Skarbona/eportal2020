import React, { FC, useEffect } from 'react';
import { Container, useMediaQuery } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { useSelector } from 'react-redux';

import './App.scss';

import { theme } from '../settings/theme-settings';
import { useReduxDispatch } from '../store/helpers';
import { fetchUserData } from '../store/user/thunks/fetchUserData';
import Pages from './Pages/Pages';
import Header from './Shared/PageElements/Header/Header';
import SnackBarAlertHandler from './Shared/UIElements/AlertHandlerInfo/SnackBarAlertHandler';
import BottomNavigation from './Shared/PageElements/BottomNavigation/BottomNavigation';
import Footer from './Shared/PageElements/Footer/Footer';
import AuthHOC from './Hoc/AuthHOC';
import OnRouteChanged from './Hoc/OnRouteChanged';
import { RootState } from '../store/store.interface';
import { checkIfTokenIsValid } from '../utils/auth';

interface AppSelector {
  id: string;
  accessToken: string;
  expirationTokenDate: Date;
  isAuthorizationDone: boolean;
}

export const App: FC = () => {
  const { id, accessToken, expirationTokenDate, isAuthorizationDone } = useSelector<
    RootState,
    AppSelector
  >(({ user, app }) => ({
    id: user.userData.id,
    accessToken: app.auth.accessToken,
    expirationTokenDate: app.auth.accessTokenExpiration,
    isAuthorizationDone: app.auth.isAuthorizationDone,
  }));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useReduxDispatch();
  useEffect(() => {
    if (!id && checkIfTokenIsValid(accessToken, expirationTokenDate)) {
      dispatch(fetchUserData(accessToken));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, expirationTokenDate, id]);

  return (
    <ThemeProvider theme={theme}>
      <>
        <AuthHOC />
        <OnRouteChanged />
        <Header accessToken={accessToken} />
        <Container component="main" className="eportal__main" maxWidth={false} disableGutters>
          {isAuthorizationDone && <Pages accessToken={accessToken} />}
          <SnackBarAlertHandler />
        </Container>
        <Footer />
        {isMobile && <BottomNavigation accessToken={accessToken} />}
      </>
    </ThemeProvider>
  );
};

export default App;
