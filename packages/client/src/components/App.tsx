import React, { FC, useEffect } from 'react';
import { Container } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';

import './App.scss';

import { useSelector } from 'react-redux';
import { theme } from '../settings/theme-settings';
import { useAuth } from '../hooks/auth-hook';
import { useReduxDispatch } from '../store/helpers';
import { fetchUserData } from '../store/user/thunk';
import { AuthContext } from '../context/auth-context';
import Pages from './Pages/Pages';
import Header from './Shared/PageElements/Header/Header';
import { RootState } from '../store/store.interface';

export const App: FC<{}> = () => {
  const { token, login, logout, storageId } = useAuth();
  const { id } = useSelector<RootState, { id: any }>(({ user }) => ({
    id: user.userData.id,
  }));
  const dispatch = useReduxDispatch();
  useEffect(() => {
    if (token && !id) {
      dispatch(fetchUserData(token));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <ThemeProvider theme={theme}>
      <AuthContext.Provider value={{ token, login, logout, storageId }}>
        <Header />
        <Container component="main" className="eportal__main">
          <Pages />
        </Container>
      </AuthContext.Provider>
    </ThemeProvider>
  );
};

export default App;
