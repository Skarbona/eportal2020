import React, { FC, useEffect, Fragment } from 'react';
import { Container } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';

import './App.scss';

import { useSelector } from 'react-redux';
import { theme } from '../settings/theme-settings';
import { useReduxDispatch } from '../store/helpers';
import { fetchUserData } from '../store/user/thunk';
import Pages from './Pages/Pages';
import Header from './Shared/PageElements/Header/Header';
import SnackBarErrorHandler from './Shared/UIElements/ErrorHandlerInfo/SnackBarErrorHandler';
import AuthHOC from './Hoc/AuthHOC';
import { RootState } from '../store/store.interface';

interface AppSelector {
  id: string;
  accessToken: string;
}

export const App: FC<{}> = () => {
  const { id, accessToken } = useSelector<RootState, AppSelector>(({ user, app }) => ({
    id: user.userData.id,
    accessToken: app.auth.accessToken,
  }));
  const dispatch = useReduxDispatch();
  useEffect(() => {
    if (accessToken && !id) {
      dispatch(fetchUserData(accessToken));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <AuthHOC />
        <Header accessToken={accessToken} />
        <Container component="main" className="eportal__main">
          <Pages accessToken={accessToken} />
          <SnackBarErrorHandler />
        </Container>
      </Fragment>
    </ThemeProvider>
  );
};

export default App;
