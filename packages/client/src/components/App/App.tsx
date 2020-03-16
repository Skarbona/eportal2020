import React, { FC, Fragment } from 'react';
import { Container } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';

import './App.scss';
import Header from '../Header/Header';
import { theme } from '../../constants/theme-settings';

const App: FC<{}> = () => {
  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <Header />
        <Container component="main" className="eportal__main" />
      </Fragment>
    </ThemeProvider>
  );
};

export default App;
