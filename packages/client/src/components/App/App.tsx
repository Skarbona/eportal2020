import React, { FC } from 'react';
import { Container } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';

import './App.scss';
import Header from '../Header/Header';
import { theme } from '../../constants/theme-settings';

const App: FC<{}> = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Container component="main" className="eportal__main" />
    </ThemeProvider>
  );
};

export default App;
