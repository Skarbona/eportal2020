import React, { FC, Fragment, useEffect } from 'react';
import { Container } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';

import './App.scss';

import { theme } from '../settings/theme-settings';
import { useReduxDispatch } from '../store/helpers';
import { fetchUserData } from '../store/user/thunk';
import Pages from './Pages/Pages';
import Header from './Shared/PageElements/Header/Header';

export const App: FC<{}> = () => {
  const dispatch = useReduxDispatch();
  useEffect(() => {
    // TODO: Implement AUTH checks, JWT checks
    dispatch(fetchUserData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <Header />
        <Container component="main" className="eportal__main">
          <Pages />
        </Container>
      </Fragment>
    </ThemeProvider>
  );
};

export default App;
