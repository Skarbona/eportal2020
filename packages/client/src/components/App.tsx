import React, { FC, useEffect } from 'react';
import { Container, useMediaQuery } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { useSelector } from 'react-redux';
import { useLocation, BrowserRouter as Router } from 'react-router-dom';

import './App.scss';

import { theme } from '../settings/theme-settings';
import { useReduxDispatch } from '../store/helpers';
import { fetchUserData } from '../store/user/thunks/fetchUserData';
import Pages from './Pages/Pages';
import Header from './Shared/PageElements/Header/Header';
import SnackBarErrorHandler from './Shared/UIElements/ErrorHandlerInfo/SnackBarErrorHandler';
import BottomNavigation from './Shared/PageElements/BottomNavigation/BottomNavigation';
import Footer from './Shared/PageElements/Footer/Footer';
import AuthHOC from './Hoc/AuthHOC';
import ScrollToTop from './Hoc/ScrollToTop';
import { RootState } from '../store/store.interface';
import { checkIfTokenIsValid } from '../utils/auth';

interface AppSelector {
  id: string;
  accessToken: string;
  expirationTokenDate: Date;
}

class DebugRouter extends Router {
  constructor(props: any) {
    super(props);
    // @ts-ignore-next-line;
    console.log('initial history is: ', JSON.stringify(this.history, null, 2));
    // @ts-ignore-next-line;
    this.history.listen((location, action) => {
      console.log(`The current URL is ${location.pathname}${location.search}${location.hash}`);
      console.log(
        `The last navigation action was ${action}`,
        // @ts-ignore-next-line;
        JSON.stringify(this.history, null, 2),
      );
    });
  }
}

export const App: FC = () => {
  let location = useLocation();
  console.log('LOCATION', location);
  const { id, accessToken, expirationTokenDate } = useSelector<RootState, AppSelector>(
    ({ user, app }) => ({
      id: user.userData.id,
      accessToken: app.auth.accessToken,
      expirationTokenDate: app.auth.accessTokenExpiration,
    }),
  );
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useReduxDispatch();
  useEffect(() => {
    if (!id && checkIfTokenIsValid(accessToken, expirationTokenDate)) {
      dispatch(fetchUserData(accessToken));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, expirationTokenDate, id]);

  return (
    <DebugRouter>
      <ThemeProvider theme={theme}>
        <>
          <AuthHOC />
          <ScrollToTop />
          <Header accessToken={accessToken} />
          <Container component="main" className="eportal__main" maxWidth={false} disableGutters>
            <Pages accessToken={accessToken} expirationDate={expirationTokenDate} />
            <SnackBarErrorHandler />
          </Container>
          <Footer />
          {isMobile && <BottomNavigation accessToken={accessToken} />}
        </>
      </ThemeProvider>
    </DebugRouter>
  );
};

export default App;
