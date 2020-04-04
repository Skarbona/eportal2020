import React, { FC, Fragment, memo } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Game from './Game/Game';
import AuthPage from './AuthPage/AuthPage';
import Main from './Main/Main';
import { RootState } from '../../store/store.interface';

// TODO: Add lazy loading for pages
export const PagesComponent: FC = () => {
  const { accessToken } = useSelector<RootState, { accessToken: string }>(({ app: { auth } }) => ({
    accessToken: auth.accessToken,
  }));
  return (
    <Fragment>
      {accessToken && (
        <Switch>
          <Route path="/" exact>
            <Main />
          </Route>
          <Route path="/gra">
            <Game />
          </Route>
        </Switch>
      )}
      {!accessToken && (
        <Switch>
          <Route path="/" exact>
            <Main />
          </Route>
          <Route path="/autentykacja/:mode">
            <AuthPage />
          </Route>
        </Switch>
      )}
    </Fragment>
  );
};

export default memo(PagesComponent);
