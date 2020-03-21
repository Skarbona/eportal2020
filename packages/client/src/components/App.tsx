import './App.scss';

import { Container } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import React, { FC, Fragment } from 'react';

import { theme } from '../constants/theme-settings';
import Pages from './Pages/Pages';
import Header from './Shared/PageElements/Header/Header';

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
