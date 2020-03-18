import React, { FC, Fragment } from 'react';
import { Container } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';

import './App.scss';
import Header from './shared/PageElements/Header/Header';
import Pages from './Pages/Pages';
import { theme } from '../constants/theme-settings';

const App: FC<{}> = () => {
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
