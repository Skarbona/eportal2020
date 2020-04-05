import React, { FC, Fragment, memo } from 'react';
import { Switch, Route } from 'react-router-dom';

import Game from './Game/Game';
import AuthPage from './AuthPage/AuthPage';
import Main from './Main/Main';

// TODO: Add lazy loading for pages
export const PagesComponent: FC<{ accessToken: string }> = ({ accessToken }) => {
  return (
    <Fragment>
      {accessToken && (
        <Switch>
          <Route path="/" exact>
            <Main />
          </Route>
          <Route path="/gra">
            <Game accessToken={accessToken} />
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

export default memo(
  PagesComponent,
  (prevProps, nextProps) =>
    prevProps?.accessToken?.length > 0 && nextProps?.accessToken?.length > 0,
);
